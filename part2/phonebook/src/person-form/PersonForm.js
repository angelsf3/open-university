function PersonForm({ props }) {
    return(
        <form onSubmit={props.addPerson}>
            <div>
                name: <input value={props.newName} onChange={props.handleNameChange}/>
            </div>
            <div>
                telephone: <input value={props.newTelephone} onChange={props.handleTelephoneChange}/>
            </div>
            <div>
                <button type="submit">add</button>
            </div>
        </form>
    )
}

export default PersonForm
