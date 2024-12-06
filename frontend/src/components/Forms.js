import React from 'react';
import './Forms.css';
import Dropdowns from './Dropdowns'

function Form() {
    return (
        <div className="form-container">
            <form>
                {/* Informações básicas */}
                <section>
                    <h2>Informações básicas:</h2>
                    <div className="form-row">
                        <input type="text" placeholder="Nº do Siged" />
                        <input type="text" placeholder="Nº do processo" />
                        <input type="text" placeholder="Vara" />
                        <input type="text" placeholder="Destino" />
                    </div>
                    <div className="form-row">
                        <Dropdowns />
                        <input type="text" placeholder="Publicação" />
                        <input type="text" placeholder="Valor do processo" />
                    </div>
                </section>

                {/* Datas */}
                <section>
                    <h2>Datas:</h2>
                    <div className="form-row">
                        <p>Data de entrada</p>
                        <input type="date" placeholder="Data de entrada"  />

                        <p>Data de Intimação</p>
                        <input type="date" placeholder="Data de intimação" />

                        <p>Data da Audiência</p>
                        <input type="date" placeholder="Data da audiência" />
                        <input type="text" placeholder="Local da audiência" />
                    </div>
                </section>

                {/* Partes Interessadas */}
                <section>
                    <h2>Partes Interessadas:</h2>
                    <div className="form-row">
                        <input type="text" placeholder="Requerente" />
                        <input type="text" placeholder="Requerido" />
                    </div>
                </section>

                {/* Observações */}
                <section>
                    <h2>Observações:</h2>
                    <textarea placeholder="Digite aqui as observações" className='observation'></textarea>
                </section>

                {/* Botões */}
                <div className="form-buttons">
                    <button type="reset">Descartar</button>
                    <button type="submit">Cadastrar</button>
                </div>
            </form>
        </div>
    );
}

export default Form;
