import React from 'react';
import {connect} from "react-redux"

import Timeline from '@mui/lab/Timeline';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineDot from '@mui/lab/TimelineDot';
import TimelineOppositeContent from '@mui/lab/TimelineOppositeContent';

const TimeLine = function(props) {
  var timeline = []
  for (var i = 0; i < props.timeline.length; i++) {
    var eventName = props.timeline[i].action;
    if (props.timeline[i].involvedName) {
      eventName += " " + props.timeline[i].involvedName
    }
    timeline.push(
      <TimelineItem>
      <TimelineOppositeContent color="text.secondary">
        {eventName}
      </TimelineOppositeContent>
      <TimelineSeparator>
        <TimelineDot />
        <TimelineConnector />
      </TimelineSeparator>
      <TimelineContent>{props.timeline[i].date.slice(4,15)}</TimelineContent>
    </TimelineItem>

    )
  }


  return (
      <Timeline position="left">
        {timeline}
      </Timeline>

  );
}

  const mapStateToProps = function(state, props) {
    return {
      timeline: state.timeline

    }
  }

  export default connect(mapStateToProps, null)(TimeLine);