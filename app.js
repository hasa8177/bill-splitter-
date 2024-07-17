const elements = 
{
    whoIsSplittingInput: document.getElementById('people-splittng-bill'),
    addPersonBtn: document.getElementById('add-person-btn'),
    listOfPeopleDiv: document.getElementById('list-of-people-div'),
    whoPaid: document.getElementById('who-paid'),
    addItemBtn: document.getElementById('add-item')
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

    console.log(billSplitterInfo);
}

const removePerson = (person) => {
    document.getElementById(person).remove();
    document.getElementById(`${person}-dropdown`).remove();

    for (let i = 0; i < billSplitterInfo.length ; i++) {
            if (billSplitterInfo[i].name === person ) {
                billSplitterInfo.splice(i, 1)
            }
        };

    console.log(billSplitterInfo);
}

const fillWhoPaidDropDown = (name) => {
    const option = document.createElement('option');
    option.value = name; 
    option.innerText = name;
    option.setAttribute('id', `${name}-dropdown`);
    elements.whoPaid.appendChild(option) 
}

elements.whoIsSplittingInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && elements.whoIsSplittingInput.value !== '') addPersonSplittingBill();
})

elements.addItemBtn.addEventListener('click', () => {
    let personThatPaid = elements.whoPaid.value;

})