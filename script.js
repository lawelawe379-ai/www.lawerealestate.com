// script.js

// Example properties array
let properties = [];

// Load properties from localStorage on page load
function loadProperties() {
    const storedProperties = localStorage.getItem('properties');
    if (storedProperties) {
        properties = JSON.parse(storedProperties);
        displayProperties();
    }
}

// Display properties in the UI
function displayProperties() {
    const propertiesContainer = document.getElementById('properties-container');
    propertiesContainer.innerHTML = '';
    properties.forEach((property) => {
        const propertyDiv = document.createElement('div');
        propertyDiv.innerHTML = `<h3>${property.name}</h3><p>${property.description}</p>`;
        propertyDiv.appendChild(createEditButton(property.id));
        propertyDiv.appendChild(createDeleteButton(property.id));
        propertiesContainer.appendChild(propertyDiv);
    });
}

// Create Edit button for property
function createEditButton(id) {
    const btn = document.createElement('button');
    btn.innerText = 'Edit';
    btn.onclick = () => editProperty(id);
    return btn;
}

// Create Delete button for property
function createDeleteButton(id) {
    const btn = document.createElement('button');
    btn.innerText = 'Delete';
    btn.onclick = () => deleteProperty(id);
    return btn;
}

// Add property form submission handling
document.getElementById('add-property-form').onsubmit = function(event) {
    event.preventDefault();
    const name = event.target.elements['name'].value;
    const description = event.target.elements['description'].value;
    addProperty(name, description);
};

// Add a property
function addProperty(name, description) {
    const id = properties.length ? properties[properties.length - 1].id + 1 : 1;
    const newProperty = { id, name, description };
    properties.push(newProperty);
    localStorage.setItem('properties', JSON.stringify(properties));
    displayProperties();
}

// Edit a property
function editProperty(id) {
    const property = properties.find(prop => prop.id === id);
    const newName = prompt('Enter new name', property.name);
    const newDescription = prompt('Enter new description', property.description);
    property.name = newName;
    property.description = newDescription;
    localStorage.setItem('properties', JSON.stringify(properties));
    displayProperties();
}

// Delete a property
function deleteProperty(id) {
    properties = properties.filter(prop => prop.id !== id);
    localStorage.setItem('properties', JSON.stringify(properties));
    displayProperties();
}

// Initialize
loadProperties();