package users

import (
	"database/sql"
	"fmt"
	"github.com/KOMA-UW/ahod/servers/gateway/indexes"
	"time"
)

const selectUserByID = "select * from user where id=?"

const selectAllUsers = "select * from user"

const selectUserByEmail = "select * from user where email=?"

const selectUserByUsername = "select * from user where username=?"

const insertUser = "insert into user(email,passhash,username,firstname,lastname,photourl) values (?,?,?,?,?,?)"

const updateUser = "update user set firstname=?, lastname=? where id=?"

const deleteUser = "delete from user where id=?"

const insertSigninAttempts = "insert into signinattempts(userid,datetime,clientip) values (?,?,?)"

type userRow struct {
	id        int64
	email     string
	passhash  []byte
	username  string
	firstname string
	lastname  string
	photourl  string
}

type signinAttemptRow struct {
	id          int64
	userid      int64
	logdatetime time.Time
	clientip    string
}

type MySQLStore struct {
	db *sql.DB
}

// NewMySQLStore constructs a MySQLStore
func NewMySQLStore(db *sql.DB) *MySQLStore {
	if db == nil {
		panic("nil pointer passed to NewMySQLStore")
	}

	return &MySQLStore{db}
}

// GetByID returns the User with the passed ID
func (store *MySQLStore) GetByID(id int64) (*User, error) {
	rows, err := store.db.Query(selectUserByID, id)
	if err != nil {
		return nil, fmt.Errorf("error selecting user: %v", err)
	}

	users, err := handleResult(rows)
	if err != nil {
		return nil, fmt.Errorf("error scanning user: %s", err)
	}

	if len(users) == 0 {
		return nil, fmt.Errorf("no user found")
	}

	return users[0], nil
}

// GetByEmail returns the User with the given email
func (store *MySQLStore) GetByEmail(email string) (*User, error) {
	rows, err := store.db.Query(selectUserByEmail, email)
	if err != nil {
		return nil, fmt.Errorf("error selecting user: %v", err)
	}

	users, err := handleResult(rows)
	if err != nil {
		return nil, fmt.Errorf("error scanning user: %s", err)
	}

	if len(users) == 0 {
		return nil, fmt.Errorf("no user found")
	}

	return users[0], nil
}

// GetByUserName returns the User with the given Username
func (store *MySQLStore) GetByUserName(username string) (*User, error) {
	rows, err := store.db.Query(selectUserByUsername, username)
	if err != nil {
		return nil, fmt.Errorf("error selecting user: %v", err)
	}

	users, err := handleResult(rows)
	if err != nil {
		return nil, fmt.Errorf("error scanning user: %s", err)
	}

	if len(users) == 0 {
		return nil, fmt.Errorf("no user found")
	}

	return users[0], nil
}

// Insert converts the NewUser to a User and inserts into db
func (store *MySQLStore) Insert(user *User) (*User, error) {

	database := store.db

	res, err := database.Exec(insertUser, user.Email, user.PassHash, user.UserName, user.FirstName, user.LastName, user.PhotoURL)

	if err != nil {
		fmt.Printf("error inserting new row: %v", err)
	} else {

		id, err := res.LastInsertId()
		if err != nil {
			fmt.Printf("error getting new ID: %v", id)
		} else {
			user.ID = id
		}
	}

	if err != nil {

		return nil, fmt.Errorf("error inserting user: %v", err)
	}

	return user, nil
}

// Update applies updates to the user
func (store *MySQLStore) Update(userID int64, updates *Updates) (*User, error) {
	if updates == nil {
		return nil, fmt.Errorf("Updates is nil")
	}

	result, err := store.db.Exec(updateUser, updates.FirstName, updates.LastName, userID)
	if err != nil {
		return nil, fmt.Errorf("error updating user: %v", err)
	}

	aff, err := result.RowsAffected()

	if err != nil {
		return nil, fmt.Errorf("error updating the user: %v", err)
	}

	if aff == 0 {
		return nil, fmt.Errorf("nothing updated: %v", aff)
	}

	return store.GetByID(userID)
}

// Delete deletes the user with the given ID
func (store *MySQLStore) Delete(userID int64) error {

	_, err := store.db.Exec(deleteUser, userID)
	if err != nil {
		return fmt.Errorf("error deleting data: %v", err)
	}

	return nil
}

//handleResult puts query result rows into a []*User.
func handleResult(rows *sql.Rows) ([]*User, error) {

	defer rows.Close()

	users := []*User{}

	row := userRow{}

	for rows.Next() {

		err := rows.Scan(&row.id, &row.email, &row.passhash, &row.username, &row.firstname, &row.lastname, &row.photourl)
		if err != nil {
			return nil, fmt.Errorf("error scanning row: %v", err)
		}
		user := &User{
			ID:        row.id,
			Email:     row.email,
			PassHash:  row.passhash,
			UserName:  row.username,
			FirstName: row.firstname,
			LastName:  row.lastname,
			PhotoURL:  row.photourl,
		}

		users = append(users, user)

	}

	if err := rows.Err(); err != nil {
		return nil, fmt.Errorf("error reading rows: %v", err)
	}

	return users, nil
}

//Trie returns the trie for existing users
func (store *MySQLStore) Trie(trie *indexes.Trie) error {

	rows, err := store.db.Query(selectAllUsers)

	if err != nil {
		fmt.Errorf("error selecting users: %v", err)
		return err
	}

	for rows.Next() {

		userRet := &User{}

		err := rows.Scan(&userRet.ID, &userRet.Email, &userRet.PassHash, &userRet.UserName, &userRet.FirstName, &userRet.LastName, &userRet.PhotoURL)
		if err != nil {
			fmt.Errorf("error scanning row: %v", err)
			return err
		}

		fullname := userRet.FirstName + " " + userRet.LastName
		trie.Add(fullname, userRet.ID)
		trie.Add(userRet.UserName, userRet.ID)

	}
	rows.Close()
	return nil
}

//ConvertIDToUsers conversts all the keys of users in a map to a slice of users
func (store *MySQLStore) ConvertIDToUsers(userIDs []int64) ([]*User, error) {
	users := []*User{}
	for _, userID := range userIDs {
		user, err := store.GetByID(userID)
		if err != nil {
			return nil, fmt.Errorf("error getting the user: %v", err)
		}
		users = append(users, user)
	}

	return users, nil
}

// InsertSiginAttempt inserts a new siginattempt row into db
func (store *MySQLStore) InsertSiginAttempt(userID int64, dateTime string, ip string) error {

	database := store.db

	res, err := database.Exec(insertSigninAttempts, userID, dateTime, ip)

	if err != nil {
		fmt.Printf("error inserting new row: %v", err)
	} else {

		id, err := res.LastInsertId()
		if err != nil {
			fmt.Printf("error getting new ID: %v", id)
		}
	}

	if err != nil {
		return fmt.Errorf("error inserting siginattemp: %v", err)
	}

	return nil
}
