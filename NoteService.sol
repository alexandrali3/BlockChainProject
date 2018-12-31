pragma solidity ^0.4.22;

contract NoteService 
{
    // Id to name.
    mapping(string => string[]) private idToName;
    // Id and name to content.
    mapping(string => mapping(string => string)) private idNameToContent;
    
    // Add Note.
    function addNote(string id, string name, string content) public {
        require(keccak256(id) != keccak256(""), "id不能为空 ");
        require(keccak256(name) != keccak256(""), "name不能为空 ");
        require(keccak256(content) != keccak256(""), "content不能为空 ");
        require(keccak256(idNameToContent[id][name]) ==  keccak256(""), "note已经存在!");
      
        idToName[id].push(name);
        idNameToContent[id][name] = content;

    }
    
    // Update Note.
    function updateNote(string id, string name, string content) public {
        require(keccak256(id) != keccak256(""), "id不能为空 ");
        require(keccak256(name) != keccak256(""), "name不能为空 ");
        require(keccak256(content) != keccak256(""), "content不能为空 ");
        require(keccak256(idNameToContent[id][name]) != keccak256(""),"note不存在!");
        idNameToContent[id][name] = content;
    }
    
    // Get Note by id and name.
    function getNote(string id, string name) view public returns(string) {
        return idNameToContent[id][name];
    }
    
    function getNoteNumberById(string id) view public returns(uint) {
        return idToName[id].length;
    }
    
    function getNoteContentByNumber(string id, uint i) view public returns(string) {
        return idNameToContent[id][idToName[id][i]];
    }
}
