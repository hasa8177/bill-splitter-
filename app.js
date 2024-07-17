const elements = 
{
    whoIsSplittingInput: document.getElementById('people-splittng-bill'),
    addPersonBtn: document.getElementById('add-person-btn'),
    listOfPeopleDiv: document.getElementById('list-of-people-div'),
    whoPaid: document.getElementById('who-paid'),
    addItemBtn: document.getElementById('add-item'),
    itemValue: document.getElementById('item'),
    checkboxDiv: document.getElementById('checkbox-div'),
    priceValue: document.getElementById('price')
}

const billSplitterInfo = [];

const addPersonSplittingBill = () => {
    if (elements.whoIsSplittingInput.value === '') return;

    const name = elements.whoIsSplittingInput.value

    const personContainer = document.createElement('div');
    personContainer.classList.add('flex', 'person-container');
    personContainer.setAttribute('id', `${name}`);

    const removeBtn = document.createElement('button');
    removeBtn.innerText = 'X';
    removeBtn.setAttribute('onclick', `removePerson('${name}')`);
    personContainer.appendChild(removeBtn);

    const person = document.createElement('p');
    person.innerText = name;
    personContainer.appendChild(person);

    elements.listOfPeopleDiv.appendChild(personContainer);

    billSplitterInfo.push({name: name})

    elements.whoIsSplittingInput.value = '';

    fillWhoPaidDropDown(name);
    addCheckbox(name)
}

const fillWhoPaidDropDown = (name) => {
    const option = document.createElement('option');
    option.value = name; 
    option.innerText = name;
    option.setAttribute('id', `${name}-dropdown`);
    elements.whoPaid.appendChild(option) 
}

const addCheckbox = (name) => {
    const checkboxContainer = document.createElement('div');
    checkboxContainer.classList.add('flex');
    checkboxContainer.setAttribute('id', `${name}-checkbox-container`)
    
    const input = document.createElement('input');
    input.setAttribute('type', 'checkbox')
    input.setAttribute('id', `${name}-checkbox`);
    input.setAttribute('name', `people-to-split-item`);
    
    const label = document.createElement('label');
    label.innerText = name; 
    label.setAttribute('for', `${name}-checkbox`);
    
    checkboxContainer.appendChild(input);
    checkboxContainer.appendChild(label);
    elements.checkboxDiv.appendChild(checkboxContainer);
}

const addItem = () => {
    const item = elements.itemValue.value
    elements.itemValue.value = '';
    
    console.log(billSplitterInfo, item);
}

const removePerson = (person) => {
    document.getElementById(person).remove();
    document.getElementById(`${person}-dropdown`).remove();
    document.getElementById(`${person}-checkbox-container`).remove();

    for (let i = 0; i < billSplitterInfo.length ; i++) {
            if (billSplitterInfo[i].name === person ) {
                billSplitterInfo.splice(i, 1)
            }
        };
}

elements.whoIsSplittingInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && elements.whoIsSplittingInput.value !== '') addPersonSplittingBill();
})

elements.addItemBtn.addEventListener('click', () => {
    let personThatPaid = elements.whoPaid.value;

})

elements.itemValue.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && elements.itemValue.value !== '') addItem();
})