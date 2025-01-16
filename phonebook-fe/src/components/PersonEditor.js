import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';

function PersonEditor({ person, onSave, setShowEditor, setSelectedPerson, setRefresh }) {
    const [formData, setFormData] = useState({
        name: person.name || '',
        surname: person.surname || '',
        address: person.address || '',
        telephone: person.telephone || '',
        age: person.age || '',
    });

    const [errors, setErrors] = useState({}); // State for validation errors

    const handleChange = (event) => {
        setFormData({
            ...formData,
            [event.target.name]: event.target.value,
        });
        setErrors((prevErrors) => ({ ...prevErrors, [event.target.name]: undefined })); // Clear error on change
    };

    const handleSubmit = (event) => {
        event.preventDefault(); // Prevent default form submission behavior

        const validationErrors = validateForm(); // Check for validation errors

        if (Object.keys(validationErrors).length === 0) {
            onSave(formData); // Call onSave if no errors
        } else {
            setErrors(validationErrors); // Set validation errors in state
        }
    };

    const validateForm = () => {
        const newErrors = {};

        if (!formData.name) {
            newErrors.name = 'Nome è obbligatorio';
        }

        if (!formData.telephone) {
            newErrors.telephone = 'Telefono è obbligatorio';
        } else if (isNaN(formData.telephone)) {
            newErrors.telephone = 'Telefono non valido';
        }

        if (formData.age && isNaN(formData.age)) {
            newErrors.age = 'Età deve essere un numero';
        }

        return newErrors;
    };

    const handleClose = () => {
        if (person.id) {
            setSelectedPerson(null);
        }
        setShowEditor(false);
    }

    const handleDeletePerson = async (person) => {
        try {
            const response = await fetch(`http://localhost:8080/user/${person.id}`, {
                method: 'DELETE',
            });
            if (!response.ok) {
                throw new Error('Errore durante l\'eliminazione della persona');
            }

            setSelectedPerson(null);
            setShowEditor(false)
            setRefresh((old) => !old); // Trigger data refresh
        } catch (error) {
            console.error('Errore durante l\'eliminazione della persona:', error);
        }
    };

    return (
        <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
                <Form.Label>Nome</Form.Label>
                <Form.Control
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    isInvalid={!!errors.name} // Set isInvalid prop for Bootstrap validation styling
                />
                <Form.Control.Feedback type="invalid">{errors.name}</Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label>Cognome</Form.Label>
                <Form.Control
                    type="text"
                    name="surname"
                    value={formData.surname}
                    onChange={handleChange}
                />
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label>Telefono</Form.Label>
                <Form.Control
                    type="text"
                    name="telephone"
                    value={formData.telephone}
                    onChange={handleChange}
                    isInvalid={!!errors.telephone}
                />
                <Form.Control.Feedback type="invalid">{errors.telephone}</Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label>Indirizzo</Form.Label>
                <Form.Control
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                />
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label>Età</Form.Label>
                <Form.Control
                    type="text"
                    name="age"
                    value={formData.age}
                    onChange={handleChange}
                    isInvalid={!!errors.age}
                />
                <Form.Control.Feedback type="invalid">{errors.age}</Form.Control.Feedback>
            </Form.Group>
            <div className="button-container">

                <Button variant="primary" type="submit">
                    Salva
                </Button>
                <Button variant="secondary" onClick={handleClose}>
                    Annulla
                </Button>
                { person.id &&
                    <Button variant="danger" onClick={() => handleDeletePerson(person)}>
                        Elimina
                    </Button>
                }

            </div>
        </Form>
    );
}

export default PersonEditor;