import React, { useEffect, useState } from 'react';
import { Table, Button, Modal, Form } from 'react-bootstrap';
import PersonEditor from './PersonEditor';
import AddModal from './AddModal';

function PhoneBook() {
    const [people, setPeople] = useState([]);
    const [selectedPerson, setSelectedPerson] = useState(null);
    const [showEditor, setShowEditor] = useState(false);
    const [refresh, setRefresh] = useState(false);

    const fetchPeople = async () => {
        try {
            const response = await fetch('http://localhost:8080/user');
            if (!response.ok) {
                throw new Error('Errore durante il recupero dei dati');
            }
            const data = await response.json();
            setPeople(data);
        } catch (error) {
            console.error('Errore durante il recupero dei dati:', error);
        }
    };

    useEffect(() => {
        fetchPeople().catch();
    }, [refresh]);

    const handleSelectPerson = (person) => {
        if(selectedPerson && selectedPerson.id == person.id) {
            setSelectedPerson(null);
        } else {
            setSelectedPerson(person);
            setShowEditor(true)
        }
    };

    const handleNuovoButton = () => {
        setShowEditor(true);
        setSelectedPerson(null);

    }

    return (
        <div>
            <h2>Rubrica Telefonica</h2>
            <Table striped bordered hover>
                <thead>
                <tr>
                    <th>Nome</th>
                    <th>Cognome</th>
                    <th>Telefono</th>
                    <th>Indirizzo</th>
                    <th>Età</th>
                </tr>
                </thead>
                <tbody>
                {people.map((person) => (
                    <tr key={person.id} onClick={() => handleSelectPerson(person)}>
                        <td>{person.name}</td>
                        <td>{person.surname}</td>
                        <td>{person.telephone}</td>
                        <td>{person.address || ''}</td>
                        <td>{person.age || ''}</td>
                    </tr>
                ))}
                </tbody>
            </Table>
            <div className="button-container">
                <Button variant="primary" onClick={handleNuovoButton}>
                    Nuovo
                </Button>
            </div>
            <AddModal person={{}} setRefresh={setRefresh} show={showEditor} setShowEditor={setShowEditor} setSelectedPerson={setSelectedPerson} />
            {selectedPerson && (
                <AddModal
                    person={selectedPerson}
                    setRefresh={setRefresh}
                    show={showEditor}
                    setShowEditor={setShowEditor}
                    setSelectedPerson={setSelectedPerson}
                />
            )}
        </div>
    );
}

export default PhoneBook;