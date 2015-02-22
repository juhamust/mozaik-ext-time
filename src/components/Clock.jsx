var React    = require('react');
var addons   = require('react-addons');
var d3       = require('d3');
var moment   = require('moment');
var timezone = require('moment-timezone');


function getCurrentTimeParts(timezoneName) {
    var currentTime = timezoneName ? moment().tz(timezoneName) : moment();

    return {
        hours:   currentTime.hours() + currentTime.minutes() / 60,
        minutes: currentTime.minutes(),
        seconds: currentTime.seconds()
    };
}

var secondsScale = d3.scale.linear().domain([0, 59 + 999/1000]).range([-90, 270]);
var minutesScale = d3.scale.linear().domain([0, 59 + 59/60]).range([-90, 270]);
var hoursScale   = d3.scale.linear().domain([0, 11 + 59/60]).range([-90, 270]);


var Clock = React.createClass({
    getInitialState() {
        return getCurrentTimeParts(this.props.timezone);
    },

    componentDidMount() {
        console.log('huurs', this.state.hours);

        setInterval(() => {
            this.setState(getCurrentTimeParts(this.props.timezone));
        }, 1000);
    },

    render() {
        var cs = addons.classSet;
        var hoursStyle   = {
            transform: 'rotate(' + hoursScale(this.state.hours % 12) + 'deg)'
        };
        var minutesStyle = {
            transform: 'rotate(' + minutesScale(this.state.minutes) + 'deg)'
        };
        var secondsStyle = {
            transform: 'rotate(' + secondsScale(this.state.seconds) + 'deg)'
        };

        var brand = this.props.timezone || 'mozaïk';

        brand = this.state.hours;

        var isDay = true;
        if (this.state.hours >= 18 &&  this.state.hours < 6) {
            isDay = false;
        }

        var timeIndicatorClasses = cs({
            'time__clock__indicator': true,
            'fa': true,
            'fa-sun-o': isDay,
            'fa-moon-o': !isDay
        });

        //window.alert('HOUR:' + this.state.hours);

        return (
            <div>
                <div className="time__clock__outer-circle" />
                <span className="time__clock__brand">{brand}</span>
                <span className={timeIndicatorClasses}></span>
                <div className="time__clock__hand time__clock__hand--seconds" style={secondsStyle} />
                <div className="time__clock__hand time__clock__hand--minutes" style={minutesStyle} />
                <div className="time__clock__hand time__clock__hand--hours"   style={hoursStyle} />
                <div className="time__clock__inner-circle" />
            </div>
        );
    }
});

module.exports = Clock;