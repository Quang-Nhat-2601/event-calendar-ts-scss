import $ from 'jquery';
import { Calendar, DayHeaderContentArg } from '@fullcalendar/core';
import { Component, createElement } from '@fullcalendar/core/preact';
import interactionPlugin from '@fullcalendar/interaction';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import './sumoselect.min.css';
import './jquery.sumoselect.min.js'; // Import JS for SumoSelect
// src/index.ts
import './styles.scss';

$(function () {
  console.log("LOAD");
  let calendarEl: HTMLElement = document.getElementById('calendar')!;

  const events = [
    { title: 'All Day Event', start: '2024-08-01' },
    { title: 'Long Event', start: '2024-08-07', end: '2024-08-10' },
    { groupId: '999', title: 'Repeating Event', start: '2024-08-09T16:00:00' },
    { groupId: '999', title: 'Repeating Event', start: '2024-08-16T16:00:00' },
    { title: 'Conference', start: '2024-08-11', end: '2024-08-13' },
    { title: 'Meeting', start: '2024-08-12T10:30:00', end: '2024-08-12T12:30:00' },
    { title: 'Lunch', start: '2024-08-12T12:00:00' },
    { title: 'Meeting', start: '2024-08-12T14:30:00' },
    { title: 'Happy Hour', start: '2024-08-12T17:30:00' },
    { title: 'Dinner', start: '2024-08-12T20:00:00' },
    { title: 'Birthday Party', start: '2024-08-13T07:00:00' },
    { title: 'Click for Google', url: 'http://google.com/', start: '2024-08-28' }
  ];

  // Populate select options with event titles
  const $eventSearch = $('#eventSearch');

  // $eventSearch.append(new Option('Select All', 'selectAll'));

  events.forEach(event => {
    $eventSearch.append(new Option(event.title, event.title));
  });

  // Initialize SumoSelect
  //const sumoSelect = ($('.search_test') as any).SumoSelect({ search: true, searchText: 'Enter here...', clearAll: true, selectAll: true });
  const sumoSelect = ($('.search_test') as any).SumoSelect({ search: true, selectAll: true });

  class CustomDayHeader extends Component<{ text: string }> {
    render() {
      return createElement('div', {}, '!' + this.props.text + '!')
    }
  }

  let calendar = new Calendar(calendarEl, {
    plugins: [interactionPlugin, dayGridPlugin, timeGridPlugin, listPlugin],
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek'
    },
    initialDate: '2024-08-02',
    navLinks: true,
    editable: true,
    dayMaxEvents: true,
    dayHeaderContent(arg: DayHeaderContentArg) {
      return createElement(CustomDayHeader, { text: arg.text })
    },
    events: events
  });

  calendar.render();

  // Search functionality
  $eventSearch.on('change', function () {
    const selectedValues = $(this).val() as string[];

    if (!selectedValues || selectedValues.length === 0) {
      calendar.removeAllEvents();
    } else {
      // Filter events based on selected values
      const filteredEvents = events.filter(event =>
        selectedValues.includes(event.title)
      );
      calendar.removeAllEvents();
      calendar.addEventSource(filteredEvents);
    }
  });
});
