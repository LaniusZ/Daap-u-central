// SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.9;

import "hardhat/console.sol";

contract DigitalIdentity {
    struct Person {
        string id;
        string name;
        string lastnameFather;
        string lastnameMother;
        int run;
        string dv;
        string career;
        int graduationYear;
    }

    uint personsCount;
    mapping (string => Person) public persons;

    constructor()  {
        personsCount = 0;
    }

    function addPerson(
        string memory _id,
        string memory _name, 
        string memory _lastnameFather,
        string memory _lastnameMother,
        int _run, 
        string memory _dv,
        string memory _career,
        int _graduationYear)
        public {


        require(bytes(_id).length > 0, "Id must be upper 0");
        require(bytes(_name).length > 0, "Name cannot be left empty");
        require(bytes(_lastnameFather).length > 0, "Lastname of Father cannot be left empty");
        require(bytes(_lastnameMother).length > 0, "Lastname of Mother cannot be left empty");
        require(_run > 0, "Run must be upper 0");
        require(bytes(_dv).length > 0, "First name cannot be left empty");
        require(bytes(_career).length > 0, "Career cannot be left empty");
        require(_graduationYear > 1900, "Graduation year must be upper 1900");

        persons[_id] = Person(
        _id,
        _name,
        _lastnameFather,
        _lastnameMother,
        _run,
        _dv,
        _career,
        _graduationYear);

        personsCount++;
    }

    function getPerson(string memory _id) public view returns(Person memory) {
        return persons[_id];
    }

    function getPersonsCount() public view returns(uint) {
        return personsCount;
    }
}