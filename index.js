// Your code here

function createEmployeeRecord(ary) {
    return {
        firstName: ary[0],
        familyName: ary[1],
        title: ary[2],
        payPerHour: ary[3],
        timeInEvents: [],
        timeOutEvents: []
    }
}

function createEmployeeRecords(ara){
    return ara.map(function(ary){
        return createEmployeeRecord(ary)
    })
}

function createTimeInEvent(employee, dateStamp){
    let [date, time] = dateStamp.split(" ")
        employee.timeInEvents.push({
            type: "TimeIn",
            hour: parseInt(time),
            date 
        })
        return employee
}

function createTimeOutEvent(employee, dateStamp){
    let [date, time] = dateStamp.split(" ")
        employee.timeOutEvents.push({
            type: "TimeOut",
            hour: parseInt(time),
            date
        })
        return employee
}

function hoursWorkedOnDate(employee, soughtDate){
    let inEvent = employee.timeInEvents.find(function(e){
        return e.date === soughtDate
    })
    let outEvent = employee.timeOutEvents.find(function(e){
        return e.date === soughtDate
    })
    return (outEvent.hour - inEvent.hour) / 100
}

let wagesEarnedOnDate = function(employee, dateSought){
    let wages = hoursWorkedOnDate(employee, dateSought)
        * employee.payPerHour
    return parseFloat(wages.toString())
}

function allWagesFor(employee){
    let workedDates = employee.timeInEvents.map(function(e){
        return e.date
    })
    let payable = workedDates.reduce(function(cal, d){
        return cal + wagesEarnedOnDate(employee, d)
    }, 0)
    return payable
}

function findEmployeeByFirstName(srcArray, firstName) {
    return srcArray.find(function(rec){
      return rec.firstName === firstName
    })
  }

function calculatePayroll(employeeRecords){
    return employeeRecords.reduce(function(memo, rec){
        return memo + allWagesFor(rec)
    }, 0)
}