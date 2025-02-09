import React, { useState } from "react";
import styles from "./CalendarPage.module.css";
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

  const handlePrevYear = () => setYear(year - 1);
  const handleNextYear = () => setYear(year + 1);
  const handleSelectMonth = (month) => setSelectedMonth(month);

  const [selectedDay, setSelectedDay] = useState(null);
  const [dayData, setDayData] = useState({});
  const [savedDayData, setSavedDayData] = useState({}); // Novo estado para salvar os dados

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
  };

  const [date, setDate] = useState({
      data: '',
      diaSemana: '',
      tipoData: ''
  })
  
  // Atualizar os dados do form
  const handleChange = (e) => {
    setDate({
      ...date,
      [e.target.name]: e.target.value
    });
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
                <div
                  key={index}
                  className={styles.month}
                  onClick={() => handleSelectMonth(index)}
                >
                  <h3>{month}</h3>
                  <table>
                    <thead>
                      <tr>
                        {["DOM", "SEG", "TER", "QUA", "QUI", "SEX", "SAB"].map(
                          (day) => (
                            <th key={day}>{day}</th>
                          )
                        )}
                      </tr>
                    </thead>
                    <tbody>
                      {Array.from(
                        { length: Math.ceil((daysInMonth + firstDay) / 7) },
                        (_, week) => (
                          <tr key={week}>
                            {Array.from({ length: 7 }, (_, day) => {
                              const dayNumber = week * 7 + day - firstDay + 1;
                              return (
                                <td
                                  key={day}
                                  className={
                                    dayNumber > 0 && dayNumber <= daysInMonth
                                      ? styles.day
                                      : styles.empty
                                  }
                                  onClick={() =>
                                    dayNumber > 0 && dayNumber <= daysInMonth
                                  }
                                >
                                  {dayNumber > 0 && dayNumber <= daysInMonth
                                    ? dayNumber
                                    : ""}
                                </td>
                              );
                            })}
                          </tr>
                        )
                      )}
                    </tbody>
                  </table>
                </div>
              );
            })}
          </div>
        </>
      ) : (
        <div className={styles.monthView}>
          <button
            className={styles.backButton}
            onClick={() => setSelectedMonth(null)}
          >
            Voltar
          </button>
          <h2>
            {months[selectedMonth]} {year}
          </h2>
          <table>
            <thead>
              <tr>
                {["DOM", "SEG", "TER", "QUA", "QUI", "SEX", "SAB"].map(
                  (day) => (
                    <th className={styles.th} key={day}>{day}</th>
                  )
                )}
              </tr>
            </thead>
            <tbody>
              {Array.from(
                {
                  length: Math.ceil(
                    (getDaysInMonth(year, selectedMonth) +
                      getFirstDayOfMonth(year, selectedMonth)) /
                      7
                  ),
                },
                (_, week) => (
                  <tr key={week}>
                    {Array.from({ length: 7 }, (_, day) => {
                      const dayNumber =
                        week * 7 +
                        day -
                        getFirstDayOfMonth(year, selectedMonth) +
                        1;
                      return (
                        <td
                          key={day}
                          className={
                            dayNumber > 0 &&
                            dayNumber <= getDaysInMonth(year, selectedMonth)
                              ? styles.day +
                                (selectedDay === dayNumber
                                  ? " " + styles.selectedDay
                                  : "")
                              : styles.empty
                          }
                          onClick={() => handleSelectDay(dayNumber)}
                        >
                          {dayNumber > 0 &&
                          dayNumber <= getDaysInMonth(year, selectedMonth)
                            ? dayNumber
                            : ""}
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
                value={dayData[`${selectedMonth}-${selectedDay}`]?.type || ""}
                onChange={(e) =>
                  handleSaveDayData(
                    e.target.value,
                    dayData[`${selectedMonth}-${selectedDay}`]?.justification ||
                      ""
                  )
                }
              >
                <option value="">Selecione o tipo</option>
                <option value="Dia Útil">Dia Útil</option>
                <option value="Feriado">Feriado</option>
                <option value="Ponto Facultativo">Ponto Facultativo</option>
              </select>

              <textarea
                placeholder="Justificativa"
                value={
                  dayData[`${selectedMonth}-${selectedDay}`]?.justification ||
                  ""
                }
                onChange={(e) =>
                  handleSaveDayData(
                    dayData[`${selectedMonth}-${selectedDay}`]?.type || "",
                    e.target.value
                  )
                }
              />

              <button
                className={styles.saveButton}
                onClick={() => {
                  // Salva os dados após clicar em "Salvar"
                  setSavedDayData({
                    ...savedDayData,
                    [`${selectedMonth}-${selectedDay}`]:
                      dayData[`${selectedMonth}-${selectedDay}`],
                  });
                  setSelectedDay(null); // Limpa a seleção do dia
                }}
              >
                Salvar
              </button>
            </div>
          )}

          {/* Exibe os dados salvos */}
          <div className={styles.savedDataPanel}>
            {Object.entries(savedDayData)
              .filter(
                ([key, value]) =>
                  key.startsWith(`${selectedMonth}-`) && value.type
              )
              .map(([key, value]) => {
                const day = key.split("-")[1]; // Pegando apenas o dia
                const dayName = new Date(
                  year,
                  selectedMonth,
                  day
                ).toLocaleDateString("pt-BR", { weekday: "short" });

                return (
                  <div key={key} className={styles.editedDay}>
                    <span className={styles.dayLabel}>
                      {dayName} {day}
                    </span>
                    <span className={styles.dayType}>{value.type}</span>
                    <p className={styles.dayJustification}>
                      {value.justification}
                    </p>
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
