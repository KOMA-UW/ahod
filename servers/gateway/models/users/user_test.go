package users

//TODO: add tests for the various functions in user.go, as described in the assignment.
//use `go test -cover` to ensure that you are covering all or nearly all of your code paths.
import (
	"crypto/md5"
	"encoding/hex"
	"golang.org/x/crypto/bcrypt"
	"io"
	"reflect"
	"strings"
	"testing"
)

//NewUser creates a new user will all fields
func CreateNewUser() *NewUser {
	return &NewUser{
		UserName:     "testuser",
		FirstName:    "Test",
		LastName:     "Tester",
		Email:        "test@example.com",
		Password:     "password",
		PasswordConf: "password",
	}
}

func TestValidate(t *testing.T) {
	cases := []struct {
		name              string
		invalidField      string
		invalidFieldValue string
		hint              string
	}{
		{
			"valid new user",
			"",
			"",
			"A valid NewUser",
		},
		{
			"invalid email",
			"Email",
			"invalid",
			"error parsing the email",
		},
		{
			"invalid email",
			"Email",
			"test@",
			"error parsing email",
		},
		{
			"invalid email",
			"Email",
			"@example.com",
			"error parsing email",
		},
		{
			"invalid password",
			"Password",
			"abcd",
			"Password length should be at least 6 characters.",
		},

		{
			"invalid password confirmation",
			"PasswordConf",
			"confirm",
			"Confirm password must match password",
		},
		{
			"empty username",
			"UserName",
			"",
			"username must not be empty",
		},
		{
			"username with a space in it",
			"UserName",
			"user name",
			"username must not contain spaces",
		},
	}

	for _, usr := range cases {
		nu := CreateNewUser()

		validate := reflect.ValueOf(nu).Elem().FieldByName(usr.invalidField)

		if validate.IsValid() {
			validate.SetString(usr.invalidFieldValue)
		}

		err := nu.Validate()

		if usr.invalidField == "" && usr.invalidFieldValue == "" {
			if err != nil {
				t.Errorf("case: %sinvalid field: {%s: %s} hint: %s", usr.name, usr.invalidField, usr.invalidFieldValue, usr.hint)
			}
		} else {
			if err == nil {
				t.Errorf("case: %sinvalid field: {%s: %s} hint: %s", usr.name, usr.invalidField, usr.invalidFieldValue, usr.hint)
			}
		}
	}
}

func TestToUser(t *testing.T) {
	cases := []struct {
		name         string
		validEmail   string
		invalidEmail string
		hint         string
	}{

		{
			"email has uppercase letters",
			"exmaple@example.come",
			"exmaple@EXAMPLE.come",
			"Should convert all letters to lower case",
		},
		{
			"email contains leading or trailing whitespace",
			"admin@example.com",
			" admin@example.com   ",
			"Should remove all spaces from front or back of email",
		},
	}

	for _, c := range cases {
		nu := CreateNewUser()

		email := c.invalidEmail

		email = strings.TrimSpace(email)

		email = strings.ToLower(email)

		nu.Email = email

		usr, err := nu.ToUser()
		if err != nil {
			t.Errorf("error converting NewUser to User\n")
		}

		if usr == nil {
			t.Errorf("ToUser() returned nil\n")
		}

		// Test Email.
		if usr.Email != c.validEmail {
			t.Errorf("case: %sgot: %s should be : %s hint: %s", c.name, usr.Email, c.validEmail, c.hint)
		}

		h := md5.New()
		io.WriteString(h, nu.Email)
		src := h.Sum(nil)
		result := hex.EncodeToString(src)
		photoURL := gravatarBasePhotoURL + result

		if len(usr.PhotoURL) == 0 {
			t.Errorf("PhotoURL field is empty\n")
		}

		if usr.PhotoURL != photoURL {
			t.Errorf("invalid PhotoURL")
		}

		if len(usr.PassHash) == 0 {
			t.Errorf("password hash is empty")
		}

		err = bcrypt.CompareHashAndPassword(usr.PassHash, []byte(nu.Password))
		if err != nil {
			t.Errorf("invalid password: %v", err)
		}
	}
}

func TestFullName(t *testing.T) {
	cases := []struct {
		name           string
		firstName      string
		lastName       string
		expectedOutput string
	}{
		{
			"first and last name are empty",
			"Test",
			"Tester",
			"Test Tester",
		},
		{
			"first name is empty",
			"",
			"Tester",
			"Tester",
		},
		{
			"last name is empty",
			"Test",
			"",
			"Test",
		},
		{
			"both first last name are empty",
			"",
			"",
			"",
		},
	}

	for _, each := range cases {
		nu := CreateNewUser()
		nu.FirstName = each.firstName
		nu.LastName = each.lastName

		usr, err := nu.ToUser()
		if err != nil {
			t.Errorf("error converting NewUser to User\n")
		}

		fullName := usr.FullName()
		if fullName != each.expectedOutput {
			t.Errorf("case: %sgot: %s should be : %s", each.name, fullName, each.expectedOutput)
		}
	}
}

func TestAuthenticate(t *testing.T) {
	usr := &User{}

	if err := usr.SetPassword("password"); err != nil {
		t.Errorf("error when set the password: %v", err)
	}

	if err := usr.Authenticate("password"); err != nil {
		t.Errorf("the password is valid")
	}

	if err := usr.Authenticate(""); err == nil {
		t.Errorf("empth password")
	}

	if err := usr.Authenticate("abc"); err == nil {
		t.Errorf("invalid password")
	}
}

func TestApplyUpdates(t *testing.T) {
	cases := []struct {
		name    string
		updates *Updates
		valid   bool
	}{
		{
			"valid updates",
			&Updates{
				"Test",
				"Tester",
			},
			false,
		},
		{
			"first name is empty",
			&Updates{
				"",
				"Tester",
			},
			true,
		},
		{
			"last name is empty",
			&Updates{
				"Test",
				"",
			},
			true,
		},
		{
			"first name and last name are empty",
			&Updates{
				"",
				"",
			},
			true,
		},
	}

	for _, each := range cases {
		usr := &User{}

		err := usr.ApplyUpdates(each.updates)
		if (!each.valid && err != nil) || (each.valid && err == nil) {
			t.Errorf("case: %sexpected error: %v actual error: %s", each.name, each.valid, err)
		}
	}
}
