import React, { useContext, useState } from "react";
import styles from "./CalendarPage.module.css";
import { getCalendarChanges, postChangeCalendar } from "../../services/calendarService";
import AuthContext from "../../context/AuthContext";
//import api from '../services/apiConfig';

const months = [
  "Janeiro",
  "Fevereiro",
  "Março",
  "Abril",
  "Maio",
  "Junho",
  "Julho",
  "Agosto",
  "Setembro",
  "Outubro",
  "Novembro",
  "Dezembro",
];

const getDaysInMonth = (year, month) => new Date(year, month + 1, 0).getDate();
const getFirstDayOfMonth = (year, month) => new Date(year, month, 1).getDay();

const CalendarPage = () => {
  const [year, setYear] = useState(new Date().getFullYear());
  const [selectedMonth, setSelectedMonth] = useState(null);

  const fetchModifiedDays = async (month) => {
    try {
      console.log("month", month);
      const response = await getCalendarChanges(year, month);
      setModifiedDays(response);
      console.log(response);
    } catch (error) {
      console.error("Erro ao buscar modificações:", error);
    }
  };
  const handlePrevYear = () => setYear(year - 1);
  const handleNextYear = () => setYear(year + 1);
  const handleSelectMonth = async (month) => {
    console.log("selectedmonth", month);
    fetchModifiedDays(month);
    setSelectedMonth(month);
  };

  const [selectedDay, setSelectedDay] = useState(null);
  const [dayData, setDayData] = useState({});
  const [savedDayData, setSavedDayData] = useState({}); // Novo estado para salvar os dados
  const [modifiedDays, setModifiedDays] = useState([]);

  const handleSelectDay = (day) => {
    if (day > 0) {
      setSelectedDay(day);
    }
  };

  const handleSaveDayData = (type, justification) => {
    setDayData((prev) => ({
      ...prev,
      [`${selectedMonth}-${selectedDay}`]: { type, justification },
    }));
    console.log(dayData);
  };
  const { user } = useContext(AuthContext);
  const [data, setData] = useState({
    Calt_Data: "",
    Calt_Motivo: "",
    Calt_Usuario_id: user.user.id,
    tipo_data: "",
  });
  // Atualizar os dados do form
  const handleChange = (e) => {
    const { name, value } = e.target;
    handleSaveDayData(dayData[`${selectedMonth}-${selectedDay}`]?.type || "", e.target.value);
    handleSaveDayData(e.target.value, dayData[`${selectedMonth}-${selectedDay}`]?.justification || "");

    setData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Salva os dados após clicar em "Salvar"
    setSavedDayData({
      ...savedDayData,
      [`${selectedMonth}-${selectedDay}`]: dayData[`${selectedMonth}-${selectedDay}`],
    });
    console.log("saved data", savedDayData);
    const date = new Date(Date.UTC(year, selectedMonth, selectedDay));
    console.log(date);
    console.log("data", data);

    const response = await postChangeCalendar({
      ...data,
      Calt_Data: date,
    });
    console.log(response);

    // setSelectedDay(null); // Limpa a seleção do dia
  };
  return (
    <div className={styles.container}>
      {!selectedMonth ? (
        <>
          <div className={styles.header}>
            <button className={styles.navButton} onClick={handlePrevYear}>
              &lt;
            </button>
            <h2>{year}</h2>
            <button className={styles.navButton} onClick={handleNextYear}>
              &gt;
            </button>
          </div>
          <div className={styles.grid}>
            {months.map((month, index) => {
              const daysInMonth = getDaysInMonth(year, index);
              const firstDay = getFirstDayOfMonth(year, index);
              return (
                <div key={index} className={styles.month} onClick={() => handleSelectMonth(index)}>
                  <h3>{month}</h3>
                  <table>
                    <thead>
                      <tr>
                        {["DOM", "SEG", "TER", "QUA", "QUI", "SEX", "SAB"].map((day) => (
                          <th key={day}>{day}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {Array.from({ length: Math.ceil((daysInMonth + firstDay) / 7) }, (_, week) => (
                        <tr key={week}>
                          {Array.from({ length: 7 }, (_, day) => {
                            const dayNumber = week * 7 + day - firstDay + 1;
                            return (
                              <td
                                key={day}
                                className={dayNumber > 0 && dayNumber <= daysInMonth ? styles.day : styles.empty}
                                onClick={() => dayNumber > 0 && dayNumber <= daysInMonth}>
                                {dayNumber > 0 && dayNumber <= daysInMonth ? dayNumber : ""}
                              </td>
                            );
                          })}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              );
            })}
          </div>
        </>
      ) : (
        <div className={styles.monthView}>
          <button className={styles.backButton} onClick={() => setSelectedMonth(null)}>
            Voltar
          </button>
          <h2>
            {months[selectedMonth]} {year}
          </h2>
          <table>
            <thead>
              <tr>
                {["DOM", "SEG", "TER", "QUA", "QUI", "SEX", "SAB"].map((day) => (
                  <th className={styles.th} key={day}>
                    {day}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {Array.from(
                {
                  length: Math.ceil((getDaysInMonth(year, selectedMonth) + getFirstDayOfMonth(year, selectedMonth)) / 7),
                },
                (_, week) => (
                  <tr key={week}>
                    {Array.from({ length: 7 }, (_, day) => {
                      const dayNumber = week * 7 + day - getFirstDayOfMonth(year, selectedMonth) + 1;
                      return (
                        <td
                          key={day}
                          className={
                            dayNumber > 0 && dayNumber <= getDaysInMonth(year, selectedMonth)
                              ? styles.day + (selectedDay === dayNumber ? " " + styles.selectedDay : "")
                              : styles.empty
                          }
                          onClick={() => handleSelectDay(dayNumber)}>
                          {dayNumber > 0 && dayNumber <= getDaysInMonth(year, selectedMonth) ? dayNumber : ""}
                        </td>
                      );
                    })}
                  </tr>
                )
              )}
            </tbody>
          </table>

          {/* Painel de Edição */}
          {selectedDay !== null && (
            <div className={styles.editPanel}>
              <h3>
                Editar {selectedDay} de {months[selectedMonth]}
              </h3>
              <select
                value={data.tipo_data}
                name="tipo_data"
                // onChange={(e) => handleSaveDayData(e.target.value, dayData[`${selectedMonth}-${selectedDay}`]?.justification || "")}
                onChange={handleChange}>
                <option value="">Selecione o tipo</option>
                <option value="dia util">Dia Útil</option>
                <option value="feriado">Feriado</option>
                <option value="ponto facultativo">Ponto Facultativo</option>
              </select>

              <textarea
                placeholder="Justificativa"
                // value={dayData[`${selectedMonth}-${selectedDay}`]?.justification || ""}
                value={data.Calt_Motivo}
                name="Calt_Motivo"
                // onChange={(e) => handleSaveDayData(dayData[`${selectedMonth}-${selectedDay}`]?.type || "", e.target.value)}
                onChange={handleChange}
              />

              <button className={styles.saveButton} type="submit" onClick={handleSubmit}>
                Salvar
              </button>
            </div>
          )}
          {selectedMonth !== null && (
            <div className={styles.modifiedDaysContainer}>
              <h3>Dias modificados em {months[selectedMonth]}:</h3>
              {modifiedDays?.length > 0 ? (
                <ul>
                  {modifiedDays?.map((day) => (
                    <li key={day.id}>
                      {new Date(day.Calt_Data).getUTCDate()} - {day.Calt_Motivo} ({day.Calt_Tipo})
                    </li>
                  ))}
                </ul>
              ) : (
                <p>Nenhuma alteração registrada para este mês.</p>
              )}
            </div>
          )}
          {/* Exibe os dados salvos */}
          <div className={styles.savedDataPanel}>
            {Object.entries(savedDayData)
              .filter(([key, value]) => key.startsWith(`${selectedMonth}-`) && value.type)
              .map(([key, value]) => {
                const day = key.split("-")[1];
                const utcDate = new Date(Date.UTC(year, selectedMonth, day));
                const dayName = utcDate.toLocaleDateString("pt-BR", {
                  weekday: "short",
                  timeZone: "UTC", // Força usar UTC no toLocaleDateString
                });
                return (
                  <div key={key} className={styles.editedDay}>
                    <span className={styles.dayLabel}>
                      {dayName} {day}
                    </span>
                    <span className={styles.dayType}>{value.type}</span>
                    <p className={styles.dayJustification}>{value.justification}</p>
                  </div>
                );
              })}
          </div>
        </div>
      )}
    </div>
  );
};

export default CalendarPage;
