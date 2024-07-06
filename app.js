const elements = 
{
    peopleSplittingBill: document.getElementById('people-splittng-bill'),
    addPersonBtn: document.getElementById('add-person-btn'),
    listOfPeopleDiv: document.getElementById('list-of-people-div')
}

const billSplitterInfo = [];

const addPersonSplittingBill = () => {
    const name = elements.peopleSplittingBill.value

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

    elements.peopleSplittingBill.value = ''

    console.log(billSplitterInfo);
}

const removePerson = (name) => {
    document.getElementById(name).remove();

    for (let i = 0; i < billSplitterInfo.length ; i++) {
            if (billSplitterInfo[i].name === name ) {
                billSplitterInfo.splice(i, 1)
            }
        };
}

elements.peopleSplittingBill.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && elements.peopleSplittingBill.value !== '') addPersonSplittingBill();
})
