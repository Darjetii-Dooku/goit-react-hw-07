import React from "react"
const Contact = ({ id, name, number, onDeleteUser }) => {
    return (
        <>
            <div>
        <div>
          <p>{name}</p>
        </div>
        <div>
          <p>{number}</p>
        </div>
      </div>
      <button type='button' onClick={() => onDeleteUser(id)}>Delete</button>
        </>
    )
}
export default Contact