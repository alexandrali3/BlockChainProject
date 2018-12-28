pragma solidity ^0.4.22;

contract NoteService 
{
    mapping(string => string) private note;
    mapping(string => mapping(string => string) ) private data;
    function addNote(string id, string name, string content) public {
        require(keccak256(id) != keccak256(""), "id不能为空 ");
        require(keccak256(name) != keccak256(""), "name不能为空 ");
        require(keccak256(content) != keccak256(""), "content不能为空 ");
        require(keccak256(data[id][name]) ==  keccak256(""), "note已经存在!");
      
        data[id][name] = content;

    }
    function updateNote(string id, string name, string content) public {
        require(keccak256(id) != keccak256(""), "id不能为空 ");
        require(keccak256(name) != keccak256(""), "name不能为空 ");
        require(keccak256(content) != keccak256(""), "content不能为空 ");
        require(keccak256(data[id][name]) != keccak256(""),"note不存在!");
        data[id][name] = content;
    }
    
    function getNote(string id, string name) view public returns(string) {
        return data[id][name];
    }
}
