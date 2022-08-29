import React from 'react';
import {connect, useSelector, useDispatch} from "react-redux"
import Timeline from '@mui/lab/Timeline';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineDot from '@mui/lab/TimelineDot';
import TimelineOppositeContent from '@mui/lab/TimelineOppositeContent';

const SingleTimeSlot = function({singleTime}) {

  return (
    <TimelineItem>
      <TimelineOppositeContent color="text.secondary">
        {singleTime.date.slice(4,15)}
      </TimelineOppositeContent>
      <TimelineSeparator>
        <TimelineDot />
        <TimelineConnector />
      </TimelineSeparator>
      <TimelineContent>{singleTime.action} {singleTime.involvedName}</TimelineContent>
    </TimelineItem>
  )
}


const BandTimeline = function({timelineData}) {

  return (
    <React.Fragment>
      {timelineData.map((singleTime) => {
        return <SingleTimeSlot key = {singleTime.date} singleTime={singleTime}/>
      })}
    </React.Fragment>

  )

}

export default BandTimeline;