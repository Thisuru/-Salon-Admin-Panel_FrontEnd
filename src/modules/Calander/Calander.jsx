import React, {
  Fragment,
  useMemo,
  useState,
  useCallback,
  useEffect,
  useRef,
} from 'react'
import GlobalContext from './context/GlobalContext'
import dayjs from 'dayjs'
import Month from './functions/Month'

import axios from 'axios';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import PropTypes from 'prop-types'
import {
  Calendar,
  Views,
  DateLocalizer,
  momentLocalizer,
} from 'react-big-calendar'
// import DemoLink from '../../DemoLink.component'
// // Storybook cannot alias this, so you would use 'react-big-calendar/lib/addons/dragAndDrop'
import withDragAndDrop from '../../addons/dragAndDrop'
import moment from 'moment'
// // Storybook cannot alias this, so you would use 'react-big-calendar/lib/addons/dragAndDrop/styles.scss'
import '../../../src/addons/dragAndDrop/styles.scss'
import { events, resourceMap } from './dumy_data'
// import { appointmentActions } from './ducks';
import { withRouter } from 'react-router-dom'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import './index.css'
import el from 'date-fns/esm/locale/el/index.js';
import AuthService from "../../api/Authaxios";

const DragAndDropCalendar = withDragAndDrop(Calendar)
const localizer = momentLocalizer(moment)

const eventStyleGetter = (event, start, end, isSelected) => {
  console.log(event)
  var backgroundColor = '#' + event.hexColor
  var style = {
    backgroundColor: backgroundColor,
    borderRadius: '0px',
    opacity: 0.8,
    color: 'black',
    border: '0px',
    display: 'block',
  }
  return {
    style: style,
  }
}

const getMonth = (month = dayjs().month()) => {
  month = Math.floor(month)
  const year = dayjs().year()
  const firstDayOfTheMonth = dayjs(new Date(year, month, 1)).day()
  let currentMonthCount = 0 - firstDayOfTheMonth
  const daysMatrix = new Array(5).fill([]).map(() => {
    return new Array(7).fill(null).map(() => {
      currentMonthCount++
      return dayjs(new Date(year, month, currentMonthCount))
    })
  })
  return daysMatrix
}

const Calander = () => {
  const [myEvents, setMyEvents] = useState([])
  const [stylist, setStylist] = useState([])
  // const [myEvents, setMyEvents] = useState(events)
  // const [stylist, setStylist] = useState(resourceMap)
  const [currenMonth, setCurrentMonth] = useState(getMonth())
  const [loading, setLoading] = useState(true)
  const clickRef = useRef(null)

  useEffect(() => {

    if(loading){
      getAllAppointments();
      getAllStylist();
    }
    

  }, [])

  
  const getAllAppointments = async () =>{

    console.log("getting appointments")

      const response = await AuthService.get(
        `http://localhost:5000/api/v1/reservation?page=1`
      );
  
      if (response.status === 200) {
        console.log("Success in Axios res.client ", response);

      //   {
      //     "id": "6320143fe0e7a938198a4738",
      //     "client": {
      //         "_id": "631c64adb70ba382c754d8c6",
      //         "firstname": "Kavidu",
      //         "lastname": "Udara",
      //         "phonenumber": "0782643599",
      //         "email": "kavidu@yahoo.com",
      //         "createdAt": "2022-09-10T10:19:25.060Z",
      //         "updatedAt": "2022-09-15T05:04:55.729Z",
      //         "__v": 0
      //     },
      //     "service": "MakeUp",
      //     "stylist": {
      //         "_id": "6319b2cb6fbdd3eee2808f3a",
      //         "firstname": "Nirmani",
      //         "lastname": "Stylist",
      //         "phonenumber": "0714517823",
      //         "email": "nirmani@gmail.com",
      //         "createdAt": "2022-09-08T09:15:55.970Z",
      //         "updatedAt": "2022-09-08T09:15:55.970Z",
      //         "__v": 0
      //     },
      //     "startTime": "2022-09-08T00:00:00.000Z",
      //     "endTime": "2022-09-20T00:00:00.000Z",
      //     "status": "completed"
      // },



        const eventArray = response.data?.reservations?.map(elm => ({ 
          
            id: elm.id,
            title: elm.service,
            start: new Date(elm.startTime),
            end: new Date(elm.endTime),
            resourceId: elm?.stylist._id,
            hexColor: elm.service === "MakeUp" ? '00FF00' : ( elm.service === "HairStyle" ? '1966EF' : 'FFFF00' ),
          
        }));

        console.log(eventArray, "event array final")

        setMyEvents(eventArray)

  
        toast("Success! Get All Appointments successfully", { type: "success" });

      } else {
        console.log("Something went wrong in Axios");
        toast("Something went wrong", { type: "error" });
      }
  }

  const getAllStylist = async () => {
    // localhost:5000/api/v1/stylists

    console.log("getting stylist")

      const response = await axios.get(
        `http://localhost:5000/api/v1/stylists`
      );
  
      if (response.status === 200) {
        console.log("Success in Axios res.client ", response);

        // { resourceId: 1, resourceTitle: 'Leo Messi' },
        // { resourceId: 2, resourceTitle: 'Wendy Smith' },
        // { resourceId: 3, resourceTitle: 'Tommy' },
        // { resourceId: 4, resourceTitle: 'Jack' },

        // "_id": "631ac79de92d57e79c79b180",
        // "firstname": "Anura",
        // "lastname": "Stylist",
        // "phonenumber": "0778249345",
        // "email": "anurastylist@gmail.com",
        // "createdAt": "2022-09-09T04:57:01.687Z",
        // "updatedAt": "2022-09-09T04:57:01.687Z",
        // "__v": 0


        const stylistArray = response.data?.map(elm => ({ 
          
            resourceId: elm._id,
            resourceTitle: elm.firstname + " " + elm.lastname,
          
        }));

        // console.log(eventArray, "event array final")

        setStylist(stylistArray)

  
        toast("Success! Get All stylist successfully", { type: "success" });

      } else {
        console.log("Something went wrong in Axios");
        toast("Something went wrong", { type: "error" });
      }


  }

  const { defaultDate, scrollToTime } = useMemo(
    () => ({
      defaultDate: new Date(),
      scrollToTime: new Date(1972, 0, 1, 8),
    }),
    []
  )

  //Reservation Drag and Drop Update
  async function reservationUpdate(event, start, end, stylist) {

    console.log("reservationUpdate start: ", start);
    console.log("reservationUpdate end: ", end);
    console.log("reservationUpdate stylist: ", stylist);
    const response = await axios.put(
      `http://localhost:5000/api/v1/reservation/calendar`,
      {
        id: event.id,
        NewStartTime: start,
        NewEndTime: end,
        stylist : stylist
      },
    );

    if (response.status === 200) {
      toast("Success! Reservation updated successfully", { type: "success" });

    } else {
      toast(response.data.message, { type: "error" });
    }
  }

  const moveEvent = useCallback(
    ({
      event,
      start,
      end,
      resourceId,
      isAllDay: droppedOnAllDaySlot = false,
    }) => {
      const { allDay } = event
      console.log("Calender event: ", event);
      console.log("Calender start: ", start);
      console.log("Calender end: ", end);
      console.log("Calender id: ", event.id);
      console.log("resourceId: ", resourceId);

      reservationUpdate(event, start, end, resourceId)

      if (!allDay && droppedOnAllDaySlot) {
        event.allDay = true
      }

      setMyEvents((prev) => {
        const existing = prev.find((ev) => ev.id === event.id) ?? {}
        const filtered = prev.filter((ev) => ev.id !== event.id)
        return [...filtered, { ...existing, start, end, resourceId, allDay }]
      })
    },
    [setMyEvents]
  )

  const resizeEvent = useCallback(
    ({ event, start, end }) => {
      setMyEvents((prev) => {
        const existing = prev.find((ev) => ev.id === event.id) ?? {}
        const filtered = prev.filter((ev) => ev.id !== event.id)
        return [...filtered, { ...existing, start, end }]
      })
    },
    [setMyEvents]
  )

  const onDoubleClickEvent = useCallback((calEvent) => {
    /**
     * Notice our use of the same ref as above.
     */
    window.clearTimeout(clickRef?.current)
    clickRef.current = window.setTimeout(() => {
      window.alert(calEvent)
    }, 250)
  }, [])

  const onSelectEvent = useCallback((calEvent) => {
    /**
     * Here we are waiting 250 milliseconds (use what you want) prior to firing
     * our method. Why? Because both 'click' and 'doubleClick'
     * would fire, in the event of a 'doubleClick'. By doing
     * this, the 'click' handler is overridden by the 'doubleClick'
     * action.
     */
    window.clearTimeout(clickRef?.current)
    clickRef.current = window.setTimeout(() => {
      window.alert(calEvent)
    }, 250)
  }, [])

  const handleSelectSlot = useCallback(
    ({ start, end }) => {
      const title = window.prompt('New Event Name')
      if (title) {
        setMyEvents((prev) => [...prev, { start, end, title }])
      }
    },
    [myEvents]
  )

  return (
    <>
      {/* <PageHeader title='Calander RND' style={{ justifyContent: 'center' }} /> */}
      <Fragment>
        {/* <DemoLink fileName="dndresource">
          <strong>
            Drag and Drop an "event" from one resource slot to another.
          </strong>
        </DemoLink> */}
        <div className='height600'>
          <DragAndDropCalendar
            defaultDate={defaultDate}
            defaultView={Views.DAY}
            events={myEvents}
            localizer={localizer}
            onEventDrop={moveEvent}
            onEventResize={resizeEvent}
            resizable
            resourceIdAccessor='resourceId'
            resources={stylist}
            resourceTitleAccessor='resourceTitle'
            scrollToTime={scrollToTime}
            selectable
            showMultiDayTimes={true}
            step={15}
            onDoubleClickEvent={onDoubleClickEvent}
            onSelectEvent={onSelectEvent}
            eventPropGetter={eventStyleGetter}
            onSelectSlot={handleSelectSlot}
          />
        </div>
      </Fragment>
      <ToastContainer />
    </>
  )
}

Calander.propTypes = {
  localizer: PropTypes.instanceOf(DateLocalizer),
}

const mapStateToProps = (state) => {
  return {
    location: state.Location.data,
    // fieldValues: getFormValues('register')(state),
  }
}

function mapDispatchToProps(dispatch) {
  return {
    // appointmentActions: bindActionCreators(appointmentActions, dispatch),
  }
}

// export default BigCalander;

// export default reduxForm({
//   form: 'register',
//   validate,
// })(connect(mapStateToProps, null)(BigCalander));

export default Calander
