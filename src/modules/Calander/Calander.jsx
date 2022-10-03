import React, { Fragment, useMemo, useState, useCallback, useEffect, useRef } from "react";
import GlobalContext from "./context/GlobalContext";
import dayjs from "dayjs";
import Month from "./functions/Month";

import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import PropTypes from "prop-types";
import { Calendar, Views, DateLocalizer, momentLocalizer } from "react-big-calendar";
// import DemoLink from '../../DemoLink.component'
// // Storybook cannot alias this, so you would use 'react-big-calendar/lib/addons/dragAndDrop'
import withDragAndDrop from "../../addons/dragAndDrop";
import moment from "moment";
// // Storybook cannot alias this, so you would use 'react-big-calendar/lib/addons/dragAndDrop/styles.scss'
import "../../../src/addons/dragAndDrop/styles.scss";
import { events, resourceMap } from "./dumy_data";
// import { appointmentActions } from './ducks';
import { withRouter } from "react-router-dom";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "./index.scss";
import el from "date-fns/esm/locale/el/index.js";
import AuthService from "../../api/Authaxios";

//modal imports
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import { Card, CardContent, Divider } from "@mui/material";
////modal styles
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4
};

const DragAndDropCalendar = withDragAndDrop(Calendar);
const localizer = momentLocalizer(moment);

const eventStyleGetter = (event, start, end, isSelected) => {
  console.log(event);
  var backgroundColor = "#" + event.hexColor;
  var style = {
    backgroundColor: backgroundColor,
    borderRadius: "0px",
    opacity: 0.8,
    color: "black",
    border: "0px",
    display: "block"
  };
  return {
    style: style
  };
};

const getMonth = (month = dayjs().month()) => {
  month = Math.floor(month);
  const year = dayjs().year();
  const firstDayOfTheMonth = dayjs(new Date(year, month, 1)).day();
  let currentMonthCount = 0 - firstDayOfTheMonth;
  const daysMatrix = new Array(5).fill([]).map(() => {
    return new Array(7).fill(null).map(() => {
      currentMonthCount++;
      return dayjs(new Date(year, month, currentMonthCount));
    });
  });
  return daysMatrix;
};

const Calander = () => {
  const [myEvents, setMyEvents] = useState([]);
  const [stylist, setStylist] = useState([]);
  // const [myEvents, setMyEvents] = useState(events)
  // const [stylist, setStylist] = useState(resourceMap)
  const [currenMonth, setCurrentMonth] = useState(getMonth());
  const [loading, setLoading] = useState(true);
  const clickRef = useRef(null);
  const [open, setOpen] = useState(false);
  const [eventData, setEventData] = useState([]);
  const [startDate, setStartDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const handleClose = () => setOpen(false);

  const handleOpen = (calEvent) => {
    let reservationDate = moment(calEvent.start).format("MMMM Do YYYY");
    let reservationTime = moment(calEvent.start).format("h:mm:ss a");

    setEventData(calEvent);
    setStartDate(reservationDate);
    setStartTime(reservationTime);
    setOpen(true);
  };

  useEffect(() => {
    if (loading) {
      getAllAppointments();
      getAllStylist();
    }
  }, []);

  const getAllAppointments = async () => {
    console.log("getting appointments");

    const response = await AuthService.get(`http://localhost:5000/api/v1/reservation?page=1`);

    if (response.status === 200) {
      console.log("Success in Axios res.Reservations ", response);

      const eventArray = response.data?.reservations?.map((elm) => ({
        id: elm.id,
        title: elm.service,
        client: elm.client.firstname + " " + elm.client.lastname,
        stylist: elm.stylist.firstname + " " + elm.stylist.lastname,
        start: new Date(elm.startTime),
        end: new Date(elm.endTime),
        resourceId: elm?.stylist._id,
        // hexColor: elm.service === "MakeUp" ? '00FF00' : ( elm.service === "HairStyle" ? '1966EF' : 'FFFF00' ),
        hexColor:
          elm.service === "MakeUp"
            ? "00FF00"
            : elm.service === "HairStyle"
            ? "1966EF"
            : elm.service === "Facial"
            ? "92eb34"
            : "FFFF00"
      }));

      console.log(eventArray, "event array final");

      setMyEvents(eventArray);

      toast("Success! Get All Appointments successfully", { type: "success" });
    } else {
      console.log("Something went wrong in Axios");
      toast("Something went wrong", { type: "error" });
    }
  };

  const getAllStylist = async () => {
    // localhost:5000/api/v1/stylists

    console.log("getting stylist");

    const response = await axios.get(`http://localhost:5000/api/v1/stylists`);

    if (response.status === 200) {
      console.log("Success in Axios res.stylists ", response);

      const stylistArray = response.data?.map((elm) => ({
        resourceId: elm._id,
        resourceTitle: elm.firstname + " " + elm.lastname
      }));

      // console.log(eventArray, "event array final")

      setStylist(stylistArray);

      toast("Success! Get All stylist successfully", { type: "success" });
    } else {
      console.log("Something went wrong in Axios");
      toast("Something went wrong", { type: "error" });
    }
  };

  const { defaultDate, scrollToTime } = useMemo(
    () => ({
      defaultDate: new Date(),
      scrollToTime: new Date(1972, 0, 1, 8)
    }),
    []
  );

  //Reservation Drag and Drop Update
  async function reservationUpdate(event, start, end, stylist, allDay, droppedOnAllDaySlot) {
    console.log("reservationUpdate start: ", start);
    console.log("reservationUpdate end: ", end);
    console.log("reservationUpdate stylist: ", stylist);
    const response = await axios.put(`http://localhost:5000/api/v1/reservation/calendar`, {
      id: event.id,
      NewStartTime: start,
      NewEndTime: end,
      stylist: stylist
    });

    if (response.status === 200) {
      toast("Success! Reservation updated successfully", { type: "success" });

      if (!allDay && droppedOnAllDaySlot) {
        event.allDay = true;
      }

      setMyEvents((prev) => {
        const existing = prev.find((ev) => ev.id === event.id) ?? {};
        const filtered = prev.filter((ev) => ev.id !== event.id);
        return [...filtered, { ...existing, start, end, stylist, allDay }];
      });
    } else {
      toast(response.data.message, { type: "error" });
    }
  }

  const moveEvent = useCallback(
    ({ event, start, end, resourceId, isAllDay: droppedOnAllDaySlot = false }) => {
      const { allDay } = event;
      console.log("Calender event: ", event);
      // console.log("Calender start: ", start);
      // console.log("Calender end: ", end);
      // console.log("Calender id: ", event.id);
      // console.log("resourceId: ", resourceId);

      reservationUpdate(event, start, end, resourceId, allDay, droppedOnAllDaySlot);

      // if (!allDay && droppedOnAllDaySlot) {
      //   event.allDay = true
      // }

      // setMyEvents((prev) => {
      //   const existing = prev.find((ev) => ev.id === event.id) ?? {}
      //   const filtered = prev.filter((ev) => ev.id !== event.id)
      //   return [...filtered, { ...existing, start, end, resourceId, allDay }]
      // })
    },
    [setMyEvents]
  );

  const resizeEvent = useCallback(
    ({ event, start, end }) => {
      setMyEvents((prev) => {
        const existing = prev.find((ev) => ev.id === event.id) ?? {};
        const filtered = prev.filter((ev) => ev.id !== event.id);
        return [...filtered, { ...existing, start, end }];
      });
    },
    [setMyEvents]
  );

  const onDoubleClickEvent = useCallback((calEvent) => {
    /**
     * Notice our use of the same ref as above.
     */
    window.clearTimeout(clickRef?.current);
    clickRef.current = window.setTimeout(() => {
      window.alert(calEvent);
    }, 250);
  }, []);

  const onSelectEvent = useCallback((calEvent) => {
    console.log("calEvent: ", JSON.stringify(calEvent));
    console.log("DATEEEE: ", calEvent.start);
    /**
     * Here we are waiting 250 milliseconds (use what you want) prior to firing
     * our method. Why? Because both 'click' and 'doubleClick'
     * would fire, in the event of a 'doubleClick'. By doing
     * this, the 'click' handler is overridden by the 'doubleClick'
     * action.
     */
    window.clearTimeout(clickRef?.current);
    clickRef.current = window.setTimeout(() => {
      // window.alert(calEvent.client)
      handleOpen(calEvent);
    }, 250);
  }, []);

  const handleSelectSlot = useCallback(
    ({ start, end }) => {
      const title = window.prompt("New Event Name");
      if (title) {
        setMyEvents((prev) => [...prev, { start, end, title }]);
      }
    },
    [myEvents]
  );

  return (
    <div className="calendar">
      <Sidebar />
      <div className="calendarContainer">
        <Navbar />
        <div className="calendar-area">
          <Card>
            <CardContent>
              <Typography variant="h5" gutterBottom>
                <b>Calendar</b>
              </Typography>
              <Divider light />
              <br/>
              {/* <PageHeader title='Calander RND' style={{ justifyContent: 'center' }} /> */}
              <Fragment>
                {/* <DemoLink fileName="dndresource">
          <strong>
            Drag and Drop an "event" from one resource slot to another.
          </strong>
        </DemoLink> */}
                <div className="height600">
                  <DragAndDropCalendar
                    defaultDate={defaultDate}
                    defaultView={Views.MONTH}
                    events={myEvents}
                    localizer={localizer}
                    onEventDrop={moveEvent}
                    onEventResize={resizeEvent}
                    resizable
                    resourceIdAccessor="resourceId"
                    resources={stylist}
                    resourceTitleAccessor="resourceTitle"
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
            </CardContent>
          </Card>
          <ToastContainer />

          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description">
            <Box sx={style}>
              <Typography id="modal-modal-title" variant="h6" component="h1">
                {<h2>{eventData.title}</h2>}
              </Typography>
              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                {
                  <p>
                    Client Name: <b>{eventData.client}</b>,<br />
                    Stylist Name: <b>{eventData.stylist}</b>, <br />
                    Reservation Date: <b>{startDate}</b>, <br />
                    Reservation Time: <b>{startTime}</b>
                  </p>
                }
              </Typography>
            </Box>
          </Modal>
        </div>
      </div>
    </div>
  );
};

Calander.propTypes = {
  localizer: PropTypes.instanceOf(DateLocalizer)
};

const mapStateToProps = (state) => {
  return {
    location: state.Location.data
    // fieldValues: getFormValues('register')(state),
  };
};

function mapDispatchToProps(dispatch) {
  return {
    // appointmentActions: bindActionCreators(appointmentActions, dispatch),
  };
}

// export default BigCalander;

// export default reduxForm({
//   form: 'register',
//   validate,
// })(connect(mapStateToProps, null)(BigCalander));

export default Calander;
