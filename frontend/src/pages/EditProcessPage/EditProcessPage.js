import React, { useState } from 'react';
import axios from 'axios';
import api from '../../services/apiConfig';

const EditProcessPage = () => {
    const [file, setFile] = useState(null);
    const [Danex_Nome, setDanex_Nome] = useState('');
    // const [Danex_Usuario, setDanex_Usuario] = useState('');
    const [Danex_NumeroProcesso_id, setDanex_NumeroProcesso_id] = useState('');

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const formData = new FormData();
        formData.append('document', file);
        formData.append('Danex_Data', new Date());
        formData.append('Danex_Nome', Danex_Nome);
        formData.append('Danex_Documento', file.name); // ou outro caminho caso você precise enviar o caminho
        // formData.append('Danex_Usuario', parseInt(Danex_Usuario));
        formData.append('Danex_NumeroProcesso_id', parseInt(Danex_NumeroProcesso_id));
        console.log(formData);
        try {
            const response = await api.post('/document/upload', formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });
            console.log(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder="Nome"
                value={Danex_Nome}
                onChange={(e) => setDanex_Nome(e.target.value)}
            />
            {/* <input
                type="text"
                placeholder="Usuário"
                value={Danex_Usuario}
                onChange={(e) => setDanex_Usuario(e.target.value)}
            /> */}
            <input
                type="text"
                placeholder="Número do Processo"
                value={Danex_NumeroProcesso_id}
                onChange={(e) => setDanex_NumeroProcesso_id(e.target.value)}
            />
            <input type="file" onChange={handleFileChange} />
            <button type="submit">Enviar Documento</button>
        </form>
    );
};

export default EditProcessPage;
