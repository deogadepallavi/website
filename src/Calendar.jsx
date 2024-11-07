import React, { useState } from 'react';

const Calendar = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [events, setEvents] = useState([]);
  const [message, setMessage] = useState('');
  const [eventInput, setEventInput] = useState('');


  //When a date is clicked, this function is called to set the selectedDate to the clicked date and
  // update the message to indicate that a date has been selected.
  const handleDateClick = (date) => {
    const formattedDate = date.toDateString();
    setSelectedDate(date);
    setMessage('Date selected:' + formattedDate);
  };

  //This function is called when there's a change in the event input field, updating the eventInput 
  //state with the new input value.
  const handleEventInputChange = (event) => {
    setEventInput(event.target.value);
  };

  //This function adds a new event to the events array if the event input is not empty.
  // It updates the message and clears the input box. If the input is empty, it shows an alert.

  const handleAddEvent = () => {
    if (eventInput.trim() !== '') {
      setEvents([...events, { date: selectedDate, event: eventInput }]);
      setMessage('Event added for ' + selectedDate.toLocaleDateString());
      setEventInput(''); // Clear the input box after adding the event
    } else {
      alert('Please enter event details.');
    }
  };


  const renderDays = () => {
    const daysInMonth = new Date(
      selectedDate.getFullYear(),
      selectedDate.getMonth() + 1,
      0
    ).getDate();

    const firstDayIndex = new Date(
      selectedDate.getFullYear(),
      selectedDate.getMonth(),
      1
    ).getDay();

    const daysArray = [];
    const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    // Render the names of the week
    weekDays.forEach((day) => {
    daysArray.push(
      <div key={`day-${day}`} className="day week-day">
        {day}
      </div>
    );
  });


    for (let i = 0; i < firstDayIndex; i++) {
      daysArray.push(<div key={`empty-${i}`} className="empty-day"></div>);
    }

    for (let i = 1; i <= daysInMonth; i++) {
      const date = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), i);
      const isToday =
        date.toDateString() === new Date().toDateString() ? 'today' : '';

      daysArray.push(
        <div
          key={i}
          onClick={() => handleDateClick(date)}
          className={`day ${isToday}`}
        >
          {i}
        </div>
      );
    }

    return daysArray;
  };

  return (
    <div className="calendar">
      <div className="header">
        <button onClick={() => setSelectedDate(new Date(selectedDate.getFullYear(), selectedDate.getMonth() - 1, 1))}>
          &lt;
        </button>
        <div className="month-year">
          {selectedDate.toLocaleString('default', { month: 'long' })}{' '}
          {selectedDate.getFullYear()}
        </div>
        <button onClick={() => setSelectedDate(new Date(selectedDate.getFullYear(), selectedDate.getMonth() + 1, 1))}>
          &gt;
        </button>
      </div>
      <div className="days">{renderDays()}</div>
      <div className="event-list">
      To add events in your calendar please select a date.  
      {message && <div className="message">{message}</div>}
      <h3>Events:</h3>
        <div className="event-input">
          <input
            type="text"
            placeholder="Enter event details"
            value={eventInput}
            onChange={handleEventInputChange}
          />
          <button className="add-event" onClick={handleAddEvent}>Add Event</button>
        </div>
        <ul>
          {events.map((event, index) => (
            <li key={index}>
              {event.date.toLocaleDateString()} - {event.event}
            </li>
          ))}
        </ul>
      </div>
      {/* {message && <div className="message">{message}</div>} */}
    </div>
  );
};

export default Calendar;
