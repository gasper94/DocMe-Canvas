import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import moment from 'moment';

const ActivityMap = ({ route }) => {
     const { data } = route.params;
  const endDate = moment().endOf('day');
  const startDate = moment().subtract(364, 'days').startOf('day'); // Set the start date to December 31st of the previous year
  const daysInYear = endDate.diff(startDate, 'days') + 1;
  const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  const weeks = [...Array(7).keys()];
  const days = [...Array(Math.ceil(daysInYear / 7)).keys()];
  const colors = ['#ebedf0', '#c6e48b', '#7bc96f', '#239a3b', '#196127'];

  const handleClick = (date) => {
    console.log('data:', data);
    const dayOfWeek = moment(date).format('dddd');
    alert(`The date for this cell is ${moment(date).format('MMMM D YYYY')} (${dayOfWeek})`);
  };

  return (
    <View style={styles.activityMap}>
      <View style={styles.weekdays}>
        {daysOfWeek.map((day) => (
          <Text key={day}>{day}</Text>
        ))}
      </View>
      <View style={styles.week}>
        {days.map((day) => (
          <View style={styles.dayContainer} key={day}>
            {weeks.map((week) => {
              const date = startDate.clone().add(day * 7 + week, 'day');
              if (date.isBefore(startDate) || date.isAfter(endDate)) { // skip dates outside of the range
                return <View style={styles.day} key={week}></View>;
              }
              const eventOccurrence = data[date.week() - 1]?.[week]?.eventOccurrence || 0;
              const color = colors[Math.min(eventOccurrence, 4)];

              return (
                <TouchableOpacity
                  style={[styles.day, { backgroundColor: color }]}
                  key={week}
                  onPress={() => handleClick(date)}
                >
                  {eventOccurrence > 0 && <Text style={styles.count}>{eventOccurrence}</Text>}
                </TouchableOpacity>
              );
            })}
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  activityMap: {
    display: 'flex',
    flexDirection: 'row',
    border: '1px solid #ebedf0',
    borderRadius: 4,
    overflow: 'hidden',
    height: 'auto',
  },
  weekdays: {
    display: 'flex',
    flexDirection: 'column',
    marginRight: 40,
  },
  week: {
    display: 'flex',
    flexDirection: 'column',
  },
  dayContainer: {
    flexDirection: 'row',
  },
  day: {
    width: 18,
    height: 18,
    borderWidth: 1,
    borderColor: '#ebedf0',
    borderRadius: 9,
    margin: 1,
    position: 'relative',
  },
  count: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: [{ translateX: -50 }, { translateY: -50 }],
    fontSize: 10,
    fontWeight: 'bold',
    color: 'white',
  },
});

export default ActivityMap;
