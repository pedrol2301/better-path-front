import React, {useEffect, useState} from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import ptBrLocale from '@fullcalendar/core/locales/pt-br';
import { EventInput } from '@fullcalendar/core';

export interface ApiEvent {
  ID: string
  UserID: string
  DeliverID: any
  Name: string
  Status: string
  StartDate: string
  EndDate: string
  StartTime: StartTime
  EndTime: EndTime
  Description: any
  AddressNumber: any
  Street: any
  Neighborhood: any
  City: any
  State: any
  Zip: any
  CreatedAt: string
  UpdatedAt: string
  DeletedAt: any
}

export interface StartTime {
  Microseconds: number
  Valid: boolean
}

export interface EndTime {
  Microseconds: number
  Valid: boolean
}

const Dashboard = () => {
  
  const [events, setEvents] = useState<EventInput[]>([]); // Estado para eventos com tipagem do FullCalendar
  const [loading, setLoading] = useState(true); // Estado para indicar carregamento

  const api = process.env.REACT_APP_API_URL; // URL da API



  // Função para buscar os eventos da API
  const fetchEvents = async () => {
    try {
      const response = await fetch(`${api}/events`,{
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('jwt')}`,
        },
      }); // Substitua pelo seu endpoint
      if (!response.ok) throw new Error('Erro ao buscar eventos');

      const data: EventInput[] = await response.json(); // Tipagem dos dados retornados pela API
      const formattedEvents = data.map((event) => ({
        id: event.ID,
        title: event.Name,
        start: event.StartDate + (event.StartTime.Microseconds ? 'T' + event.StartTime.Microseconds : ''),
        end: event.EndDate + (event.EndTime.Microseconds ? 'T' + event.EndTime.Microseconds : ''),
        allDay:  false, // Garantir valor padrão para allDay
      }));

      console.log('Dados:', data);
      console.log('Eventos:', formattedEvents);

      setEvents(formattedEvents); // Atualiza o estado com os eventos
    } catch (error) {
      console.error('Erro ao carregar eventos:', error);
    } finally {
      setLoading(false); // Finaliza o carregamento
    }
  };

  useEffect(() => {
    fetchEvents(); // Busca os eventos ao montar o componente
  }, []);

  if (loading) {
    return <p>Carregando calendário...</p>;
  }
 


  return (
    <>
      <h1 className="title is-3 has-text-centered">Meu Calendário</h1>
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        events={events}
        locale={ptBrLocale}
        headerToolbar={{
          left: 'prev,next today',
          center: 'title',
          right: 'dayGridMonth,timeGridWeek,timeGridDay',
        }}
        

        // Customização
        eventClassNames="has-background-warning has-border-warning has-text-black" // Classe do Bulma para eventos
        dayHeaderClassNames="has-background-warning has-text-white custom-white" // Classe para o cabeçalho do dia
        viewClassNames="has-background-white has-text-black" // Classe para a view
        

      />

    </>
  );
};

export default Dashboard;
