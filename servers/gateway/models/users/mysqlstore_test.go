package users

import (
	"fmt"
	"regexp"
	"testing"

	sqlmock "gopkg.in/DATA-DOG/go-sqlmock.v1"
)

func TestMySQLStore(t *testing.T) {

	db, mock, err := sqlmock.New()
	if err != nil {
		t.Fatalf("error creating sql mock: %v", err)
	}

	defer db.Close()

	newUser := CreateNewUser()

	expectedUser, _ := newUser.ToUser()

	store := NewMySQLStore(db)

	rows := sqlmock.NewRows([]string{"id", "email", "passhash", "username", "firstname", "lastname", "photourl"})
	rows.AddRow(expectedUser.ID, expectedUser.Email, expectedUser.PassHash, expectedUser.UserName, expectedUser.FirstName, expectedUser.LastName, expectedUser.PhotoURL)

	mock.ExpectExec(regexp.QuoteMeta(insertUser)).
		WithArgs(expectedUser.Email, expectedUser.PassHash, expectedUser.UserName, expectedUser.FirstName, expectedUser.LastName, expectedUser.PhotoURL).
		WillReturnResult(sqlmock.NewResult(1, 1))

	_, err = store.Insert(expectedUser)
	if err != nil {
		t.Errorf("unexpected error occurs when inserting new user: %v", err)
	}

	if err := mock.ExpectationsWereMet(); err != nil {
		t.Errorf("unmet sqlmock expectations: %v", err)
	}

	mock.ExpectExec(regexp.QuoteMeta(insertUser)).
		WithArgs(expectedUser.Email, expectedUser.PassHash, expectedUser.UserName, expectedUser.FirstName, expectedUser.LastName, expectedUser.PhotoURL).
		WillReturnError(fmt.Errorf("test DMBS error"))

	_, err = store.Insert(expectedUser)
	if err == nil {
		t.Errorf("expected error does not occurs when inserting new user: %v", err)
	}

	if err := mock.ExpectationsWereMet(); err != nil {
		t.Errorf("unmet sqlmock expectations: %v", err)
	}

	mock.ExpectQuery(regexp.QuoteMeta(selectUserByID)).
		WithArgs(expectedUser.ID).
		WillReturnRows(rows)

	_, err = store.GetByID(expectedUser.ID)
	if err != nil {
		t.Errorf("unexpected error occurs when get user by ID: %v", err)
	}

	mock.ExpectQuery(regexp.QuoteMeta(selectUserByID)).
		WithArgs(expectedUser.ID).
		WillReturnError(fmt.Errorf("test DMBS error"))

	_, err = store.GetByID(expectedUser.ID)
	if err == nil {
		t.Errorf("expected does not error occurs when getting user by id: %v", err)
	}

	if err := mock.ExpectationsWereMet(); err != nil {
		t.Errorf("unmet sqlmock expectations: %v", err)
	}

	rows = sqlmock.NewRows([]string{"id", "email", "passhash", "username", "firstname", "lastname", "photourl"})
	rows.AddRow(expectedUser.ID, expectedUser.Email, expectedUser.PassHash, expectedUser.UserName, expectedUser.FirstName, expectedUser.LastName, expectedUser.PhotoURL)

	mock.ExpectQuery(regexp.QuoteMeta(selectUserByEmail)).
		WithArgs(expectedUser.Email).
		WillReturnRows(rows)

	_, err = store.GetByEmail(expectedUser.Email)
	if err != nil {
		t.Errorf("unexpected error occurs when get user by email: %v", err)
	}

	mock.ExpectQuery(regexp.QuoteMeta(selectUserByEmail)).
		WithArgs(expectedUser.Email).
		WillReturnError(fmt.Errorf("test DMBS error"))

	_, err = store.GetByEmail(expectedUser.Email)
	if err == nil {
		t.Errorf("expected does not error occurs when getting user by email: %v", err)
	}

	if err := mock.ExpectationsWereMet(); err != nil {
		t.Errorf("unmet sqlmock expectations: %v", err)
	}

	rows = sqlmock.NewRows([]string{"id", "email", "passhash", "username", "firstname", "lastname", "photourl"})
	rows.AddRow(expectedUser.ID, expectedUser.Email, expectedUser.PassHash, expectedUser.UserName, expectedUser.FirstName, expectedUser.LastName, expectedUser.PhotoURL)

	mock.ExpectQuery(regexp.QuoteMeta(selectUserByUsername)).
		WithArgs(expectedUser.UserName).
		WillReturnRows(rows)

	_, err = store.GetByUserName(expectedUser.UserName)
	if err != nil {
		t.Errorf("unexpected error occurs when get user by UserName: %v", err)
	}

	mock.ExpectQuery(regexp.QuoteMeta(selectUserByUsername)).
		WithArgs(expectedUser.UserName).
		WillReturnError(fmt.Errorf("test DMBS error"))

	_, err = store.GetByUserName(expectedUser.UserName)
	if err == nil {
		t.Errorf("expected does not error occurs when getting user by UserName: %v", err)
	}

	if err := mock.ExpectationsWereMet(); err != nil {
		t.Errorf("unmet sqlmock expectations: %v", err)
	}

	update := &Updates{
		FirstName: "updatedFirstName",
		LastName:  "updatedLastName",
	}

	mock.ExpectExec(regexp.QuoteMeta(updateUser)).
		WithArgs(update.FirstName, update.LastName, expectedUser.ID).
		WillReturnResult(sqlmock.NewResult(1, 1))

	err = store.Update(expectedUser.ID, update)

	if err != nil {
		t.Errorf("unexpected error occurs when update user: %v", err)
	}

	mock.ExpectExec(regexp.QuoteMeta(updateUser)).
		WithArgs(update.FirstName, update.LastName, expectedUser.ID).
		WillReturnError(fmt.Errorf("test DMBS error"))

	err = store.Update(expectedUser.ID, update)
	if err == nil {
		t.Errorf("expected does not error occurs when update user: %v", err)
	}

	if err := mock.ExpectationsWereMet(); err != nil {
		t.Errorf("unmet sqlmock expectations: %v", err)
	}
	mock.ExpectExec(regexp.QuoteMeta(deleteUser)).
		WithArgs(expectedUser.ID).
		WillReturnResult(sqlmock.NewResult(1, 1))

	err = store.Delete(expectedUser.ID)
	if err != nil {
		t.Errorf("unexpected error occurs when deleting user: %v", err)
	}

	if err := mock.ExpectationsWereMet(); err != nil {
		t.Errorf("unmet sqlmock expectations: %v", err)
	}

	mock.ExpectExec(regexp.QuoteMeta(deleteUser)).
		WithArgs(expectedUser.ID).
		WillReturnError(fmt.Errorf("test DMBS error"))

	err = store.Delete(expectedUser.ID)
	if err == nil {
		t.Errorf("expected error does not occurs when deleting user: %v", err)
	}

	if err := mock.ExpectationsWereMet(); err != nil {
		t.Errorf("unmet sqlmock expectations: %v", err)
	}
}
