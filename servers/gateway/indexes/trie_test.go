package indexes

//TODO: implement automated tests for your trie data structure

import (
	"testing"
)

func TestFind(t *testing.T) {

	cases := []struct {
		name        string
		keys        []string
		prefix      string
		numResults  int
		lenExpected int
	}{
		{
			"shared prefix",
			[]string{"leaves", "leaf", "leave", "leaving", "lead", "league"},
			"leaves",
			20,
			4,
		},
		{
			"no shared prefix",
			[]string{"awesome", "big", "happy"},
			"b",
			20,
			1,
		},
		{
			"empty prefix",
			[]string{"awesome", "big", "happy"},
			"",
			20,
			0,
		},
		{
			"empty trie",
			[]string{},
			"",
			20,
			0,
		},
		{
			"exceeds list limitation",
			[]string{"leaves", "leaf", "leave", "leaving", "lead", "league"},
			"d",
			3,
			3,
		},
		{
			"duplicated keys",
			[]string{"leaves", "leaves", "leaves", "door", "desk", "cat"},
			"leaves",
			4,
			4,
		},
		{
			"duplicated keys with results limit",
			[]string{"leaf", "leaf", "leaf", "door", "desk", "cat"},
			"leaves",
			2,
			2,
		},
		{
			"different casting",
			[]string{"leaf", "leaf", "leaf", "door", "deSk", "cat"},
			"d",
			20,
			5,
		},
	}

	for _, each := range cases {

		trie := NewTrie()

		id := int64(0)
		for _, key := range each.keys {
			trie.Add(key, id)
			id++
		}

		result := trie.Find(each.prefix, each.numResults)
		if len(result) != each.lenExpected {
			t.Errorf("\ncase: %v\ngot: %v\nwant: %v", each.name, len(result), each.lenExpected)
		}
	}

	specialCases := []struct {
		name                 string
		keys                 []string
		prefix               string
		expectedResultLength int
	}{
		{
			"different keys have same values",
			[]string{"leaf", "leaves", "dope"},
			"leaves",
			1,
		},
	}

	for _, c := range specialCases {
		userID := int64(0)
		trie := NewTrie()
		for _, key := range c.keys {
			trie.Add(key, userID)
			userID++
		}

		result := trie.Find(c.prefix, 20)
		if len(result) != c.expectedResultLength {
			t.Errorf("\ncase: %v\ngot: %v\nwant: %v", c.name, len(result), c.expectedResultLength)
		}
	}
}

func TestRemove(t *testing.T) {

	values := []int64{
		int64(0),
		int64(1),
		int64(2),
		int64(3),
		int64(4),
	}

	cases := []struct {
		name           string
		keys           []string
		key            string
		value          int64
		expectedLength int
	}{
		{
			"target node has child nodes",
			[]string{"leaf", "leaves", "dope", "cat"},
			"leaves",
			values[1],
			2,
		},
		{
			"target node has no child nodes",
			[]string{"leaf", "leaves", "dope", "cat"},
			"leaf",
			values[0],
			0,
		},
		{
			"target node has multiple values",
			[]string{"leaves", "leaves", "leaves", "leaf", "dope"},
			"leaves",
			values[0],
			4,
		},
		{
			"case-insensitive remove",
			[]string{"leaves", "leaves", "leaves", "leaf", "dope"},
			"leaves",
			values[0],
			4,
		},
		{
			"remove empty key",
			[]string{"leaves", "dooog"},
			"",
			values[0],
			0,
		},
		{
			"empty trie",
			[]string{},
			"leaves",
			values[1],
			0,
		},
	}

	for _, each := range cases {
		trie := NewTrie()

		for i, key := range each.keys {
			trie.Add(key, values[i])
		}

		trie.Remove(each.key, each.value)

		result := trie.Find(each.key, 20)
		if len(result) != each.expectedLength {
			t.Errorf("\ncase: %v\ngot: %v\nwant: %v", each.name, len(result), each.expectedLength)
		}
	}

	specialCases := []struct {
		name           string
		keys           []string
		key            string
		value          int64
		testKey        string
		expectedOutput int
	}{
		{
			"remove useless with its node",
			[]string{"leaves", "leaf"},
			"leaf",
			values[1],
			"leaves",
			0,
		},
		{
			"remove multiple useless nodes",
			[]string{"leaves", "doooont"},
			"doooont",
			values[1],
			"leaves",
			0,
		},
		{
			"remove multiple useless nodes when parent node has multiple child nodes",
			[]string{"leaves", "dooog", "dot", "leaf"},
			"dooog",
			values[1],
			"leaves",
			2,
		},
	}

	for _, each := range specialCases {
		trie := NewTrie()

		for i, key := range each.keys {
			trie.Add(key, values[i])
		}

		trie.Remove(each.key, each.value)

		cur := trie.root
		for _, char := range each.testKey {
			_, hasKey := cur.ChildrenMap[char]
			if !hasKey {
				t.Error("error finding node")
			}
			cur = cur.ChildrenMap[char]
		}

		if len(cur.Children) != each.expectedOutput {
			t.Errorf("\ncase: %v\ngot: %v\nwant: %v", each.name, len(cur.Children), each.expectedOutput)
		}
	}
}
