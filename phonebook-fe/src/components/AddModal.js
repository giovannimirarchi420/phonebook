import {Button, Modal} from "react-bootstrap";
import React from "react";
import PersonEditor from "./PersonEditor";


const AddModal = (props) => {

    // Function to handle form submissions (saving a new person)
    const handleSubmitModify = async (person) => {

        try {
            const response = await fetch('http://localhost:8080/user/'+props.person.id, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(person),
            });

            if (!response.ok) {
                throw new Error('Error saving new person');
            }

            // Assuming successful creation returns the newly created person data
            const createdPerson = await response.json();

            props.setShowEditor(false); // Close the modal
            props.setRefresh((old) => {
                console.log(old);
                return !old
            })
        } catch (error) {
            console.error('Error saving new person:', error);
            // Handle errors gracefully, e.g. display an error message to the user
        }
    };
    // Function to handle form submissions (saving a new person)
    const handleSubmit = async (newPerson) => {

        try {
            const response = await fetch('http://localhost:8080/user', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newPerson),
            });

            if (!response.ok) {
                throw new Error('Error saving new person');
            }

            // Assuming successful creation returns the newly created person data
            const createdPerson = await response.json();

            props.setShowEditor(false); // Close the modal
            props.setRefresh((old) => {
                console.log(old);
                return !old
            })
        } catch (error) {
            console.error('Error saving new person:', error);
            // Handle errors gracefully, e.g. display an error message to the user
        }
    };

    return <Modal show={props.show}>
        <Modal.Header>
            <Modal.Title>Editor Persona</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <PersonEditor person={props.person} onSave={props.person.id ? handleSubmitModify : handleSubmit} setSelectedPerson={props.setSelectedPerson} setShowEditor={props.setShowEditor} setRefresh={props.setRefresh}/>
        </Modal.Body>
    </Modal>
}

export default AddModal;