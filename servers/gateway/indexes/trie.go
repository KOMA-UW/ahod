package indexes

import (
	"errors"
	"fmt"
	"sort"
	"strings"
	"sync"
)

//TODO: implement a trie data structure that stores
//keys of type string and values of type int64

//PRO TIP: if you are having troubles and want to see
//what your trie structure looks like at various points,
//either use the debugger, or try this package:
//https://github.com/davecgh/go-spew

//Trie implements a trie data structure mapping strings to int64s
//that is safe for concurrent use.
type Trie struct {
	root *TrieNode
	size int
	mx   sync.RWMutex
}

//NewTrie constructs a new Trie.
func NewTrie() *Trie {
	return &Trie{
		&TrieNode{
			Char:        0,
			Values:      make(map[int64]bool),
			Children:    make([]*TrieNode, 0),
			ChildrenMap: make(map[rune]int),
		},
		0,
		sync.RWMutex{},
	}

}

type TrieNode struct {
	Char        rune
	Values      map[int64]bool
	Children    []*TrieNode
	ChildrenMap map[rune]int
}

//Len returns the number of entries in the trie.
func (t *Trie) Len() int {
	return t.size
}

//Add adds a key and value to the trie.
func (t *Trie) Add(key string, value int64) {

	if len(key) == 0 {
		return
	}
	key = strings.ToLower(key)
	t.mx.Lock()

	parts := strings.Fields(key)
	added := true
	for _, p := range parts {
		added = added && (addHelper([]rune(p), value, t.root) == nil)
	}
	addHelper([]rune(key), value, t.root)
	if added {
		t.size++
	}
	t.mx.Unlock()
	//panic("implement this function according to the comments above")
	// defer t.mx.Unlock()
}

func addHelper(key []rune, value int64, node *TrieNode) error {
	if len(key) == 0 {
		_, ok := node.Values[value]
		if !ok {
			node.Values[value] = true
			return nil
		}
		return errors.New("")
	}
	firstChar := key[0]
	index, ok := node.ChildrenMap[firstChar]
	var nextNode *TrieNode
	if ok {
		nextNode = node.Children[index]
	} else {
		nextNode = &TrieNode{
			Char:        firstChar,
			Values:      make(map[int64]bool),
			Children:    make([]*TrieNode, 0),
			ChildrenMap: make(map[rune]int),
		}
		nextIndex := len(node.Children)
		node.Children = append(node.Children, nextNode)
		node.ChildrenMap[firstChar] = nextIndex
	}
	return addHelper(key[1:], value, nextNode)
}

//Find finds `max` values matching `prefix`. If the trie
//is entirely empty, or the prefix is empty, or max == 0,
//or the prefix is not found, this returns a nil slice.
/*
1)
		base case: take all values up to MAX number in the current node, return
        note, base case is only if the len(keys) == 0)
        if number of values in current node is not up to MAX number,
        then invoke Find() on each of the children, passing MAX - len(results).
        When Find() returns with results, update the results
        Note: len(keys)  > 0 means we haven't gotten to the end of
		the prefix yet, and we have no business returning any results.
*/
func (t *Trie) Find(prefix string, max int) []int64 {
	t.mx.RLock()

	prefix = strings.ToLower(prefix)

	if max == 0 || t.size == 0 || len(prefix) == 0 {
		return nil
	}

	currentNode := findHelper(t.root, []rune(prefix))

	if currentNode == nil {
		return nil
	}

	res := make(map[int64]bool)
	res = findAllValues(currentNode, res, max)
	resSlice := make([]int64, 0)

	for k := range res {
		resSlice = append(resSlice, k)
	}
	t.mx.RUnlock()

	return resSlice
}

func findHelper(node *TrieNode, prefix []rune) *TrieNode {

	if len(prefix) == 0 {
		return node
	}
	index, ok := node.ChildrenMap[prefix[0]]
	if !ok {
		return nil
	}
	retNode := findHelper(node.Children[index], prefix[1:])
	return retNode

}

func findAllValues(node *TrieNode, res map[int64]bool, max int) map[int64]bool {
	if len(node.Values) != 0 {
		var keys []int64
		for k := range node.Values {
			keys = append(keys, k)
		}
		sort.Slice(keys, func(i, j int) bool { return keys[i] < keys[j] })
		for _, k := range keys {
			if len(res) < max {
				res[k] = true
			} else {
				return res
			}
		}
	} else {
		var keys []rune
		for k := range node.ChildrenMap {
			keys = append(keys, k)
		}
		sort.Slice(keys, func(i, j int) bool { return keys[i] < keys[j] })
		for _, child := range keys {
			index := node.ChildrenMap[child]
			res = findAllValues(node.Children[index], res, max)
			if len(res) >= max {
				return res
			}
		}
	}
	return res
}

//Remove removes a key/value pair from the trie
//and trims branches with no values.
func (t *Trie) Remove(key string, value int64) {

	id := t.Find(key, 1)
	if id == nil || id[0] != value {
		fmt.Println("not found")
		return
	}

	parts := strings.Fields(key)
	removed := true
	for _, p := range parts {
		_, err := removeHelper([]rune(p), value, t.root)
		removed = removed && (err == nil)
	}
	if removed {
		t.size--
	}

}

func removeHelper(key []rune, value int64, node *TrieNode) (bool, error) {
	if len(key) == 0 {
		_, ok := node.Values[value]
		if !ok {
			return false, errors.New("")
		}
		delete(node.Values, value)
		return len(node.Values) == 0 && len(node.Children) == 0, nil
	}
	index, ok := node.ChildrenMap[key[0]]
	if !ok {
		return false, errors.New("")
	}
	shouldPrune, err := removeHelper(key[1:], value, node.Children[index])
	if err != nil {
		return false, err
	}
	if shouldPrune {
		delete(node.ChildrenMap, key[0])
		node.Children = append(node.Children[0:index], node.Children[index+1:]...)
	}
	return false, nil
}
