import React, { useContext, useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'
import { useHttp } from '../hooks/http.hook'



export const CreatePage = () => {

    useEffect( () => {
        window.M.updateTextFields()
    }, [] )

    const auth = useContext(AuthContext)
    const {request} = useHttp()
    const [link, setLink] = useState('')
    const history = useHistory()

    const pressHandler = async event => {
        if (event.key === 'Enter') {
            try {
                const data = await request('/api/link/generate', 'POST', {from: link}, { Authorization: `Bearer ${auth.token}` })
                history.push(`/detail/${data.link._id}`)
            } catch (e) {
                
            }
        } 
    }

    return (
        <div className="row">
            <div className="col s8 offset-s2">
                <div className="input-field">
                    <input
                        placeholder="Put link"
                        id="link"
                        type="text"
                        name="link"
                        className="yellow-input"
                        value={link}
                        onChange={e => setLink(e.target.value)}
                        onKeyPress={pressHandler} />

                    <label htmlFor="link">Put link</label>
                </div>
            </div>
        </div>
    )
}