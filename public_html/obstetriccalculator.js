
    
function defaults(){
   window.resizeTo(500,530);
   document.body.style.overflow = 'hidden';
   showToday();
   document.form1.day.focus();
}

function showToday()
{
	
	var now = new Date();
	var days = new Array('Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday');
	var months = new Array('January','February','March','April','May','June','July','August','September','October','November','December');
	var date = ((now.getDate()<10) ? "0" : "")+ now.getDate();
	function fourdigits(number)
	{
		return (number < 1000) ? number + 1900 : number;
	}
	
	tnow=new Date();
	thour=now.getHours();
	tmin=now.getMinutes();
	tsec=now.getSeconds();
	
	//var clockface = new Array('|', '/', '-', '\\' );
	var clockface = new Array('\u2764','\u2763','\u2762','\u2765');
	var cface = clockface[tsec%4];
	if (tmin<=9) { tmin="0"+tmin; }
	//if (tsec<=9) { tsec="0"+tsec; }
	if (thour<10) { thour="0"+thour; }
	
	var today = days[now.getDay()] + " " + date + " " + months[now.getMonth()] + " " + (fourdigits(now.getFullYear())) + " " + thour + ":" + tmin + " " + cface;
	document.getElementById("todayDate").innerHTML = today;
	
}

setInterval("showToday()", 1000);

function keyPress(field)
{
   maxlength=document.getElementById(field.name).getAttribute('maxlength');
   if(field.value.length==maxlength)
   {  if(field.name=="day")
         form1.month.focus();
      if(field.name=="month")
         form1.year.focus();
      if(field.name=="year")
         form1.calcButton.focus();
   }
}

function calculate(form1)
{
   //variables
   var month=document.form1.month.value
   while(month.substring(0,1) == '0'){ month = month.substring(1,month.length);}   //remove leading zeros
   month = parseInt(month)
   var day=document.form1.day.value
   while(day.substring(0,1) == '0'){ day = day.substring(1,day.length);}   //remove leading zeros
   day = parseInt(day)
   var yearTemp = parseInt(document.form1.year.value)
   var year = (yearTemp<1000) ? yearTemp + 2000 : yearTemp;
   var monthLong = new init_array("January", "February", "March", "April", "May",
      "June", "July", "August", "September", "October", "November", "December");
   var showDate = new Date() //will contain the date that is to be displayed
   var dayLong = new Array('Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday');

   if (document.form1.month.value == 0 || document.form1.day.value == 0 || document.form1.year.value == 0)
   {
      alert("You haven't entered a date");
      return
   }

   //determine calculation method
   if (document.form1.calcBy.value == 1)  //calculate by lmp
   {
      var reallmp = new Date(year, month-1, day, 12, 0, 0)
   }

   if (document.form1.calcBy.value == 2)  //calculate by due date
   {
      var templmp = new Date(year, month-1, day, 12, 0, 0)
      var reallmp = new Date(templmp.getTime() - addweeks(40))
   }


   //calc and display LMP
   showDate.setTime(reallmp.getTime())
	//   document.form1.lmp.value = monthLong[showDate.getMonth()+1] + " " + showDate.getDate() + ', ' + showDate.getFullYear()
   document.form1.lmp.value = showDate.getDate() + " " + monthLong[showDate.getMonth()+1] + " " + showDate.getFullYear()

	// day or days, week or weeks
	function pluralday(days) {
		return (days%7)>1 ? " days " : " day ";
	}
	function pluralweek(days) {
		return Math.floor(days/7)>1 ? " weeks and " : " week and ";
	}
	
   //calc and display GA
   var current = new Date()
   var dif = (current.getTime() - reallmp.getTime())  //due date - today
   var days = Math.round(dif / (1000 * 60 * 60 * 24))
   document.form1.weeksToday.value = Math.floor(days / 7) + pluralweek(days) + (days % 7) + pluralday(days)

   //calc and display EDD
   showDate.setTime(reallmp.getTime() + addweeks(40))
   document.form1.dueDate.value = showDate.getDate() + " " + monthLong[showDate.getMonth()+1] + " " + showDate.getFullYear() + " " + dayLong[showDate.getDay()]

   //calc and display Time Remaining
	/* var current = new Date()
   var dif = (reallmp.getTime() + addweeks(40)) - current.getTime()  //due date - today
   var days = Math.round(dif / (1000 * 60 * 60 * 24))
   document.form1.weeksLeft.value = Math.floor(days / 7) + ' week(s) and ' + (days % 7) + ' day(s)'
	*/
   //calc and display atGivenWeeks
   showDate.setTime(reallmp.getTime() + addweeks(document.form1.upcoming.value ))
   document.form1.atGivenWeeks.value = showDate.getDate() + " " + monthLong[showDate.getMonth()+1] + " " + showDate.getFullYear()
	
	//at20Weeks, at38Weeks
	showDate.setTime(reallmp.getTime() + addweeks(20)) ;
	document.form1.at20Weeks.value = showDate.getDate() + " " + monthLong[showDate.getMonth()+1] + " " + showDate.getFullYear()

	// at30Weeks
   showDate.setTime(reallmp.getTime() + addweeks(30)) ;
	document.form1.at30Weeks.value = showDate.getDate() + " " + monthLong[showDate.getMonth()+1] + " " + showDate.getFullYear()

	// at38Weeks
	showDate.setTime(reallmp.getTime() + addweeks(38)) ;
	document.form1.at38Weeks.value = showDate.getDate() + " " + monthLong[showDate.getMonth()+1] + " " + showDate.getFullYear() + " " + dayLong[showDate.getDay()]

   if (document.form1.month2.value == 0 || document.form1.day2.value == 0 || document.form1.year2.value == 0)
	{
	   document.form1.weeksOnDate.value = "Select a date";
      return;
	}


  
   
   //clear the form and start over
   document.form1.clearButton.focus()
}



function addweeks(weeks){
   return weeks*24*60*60*1000*7
}



function clearForm(form1) {
  form1.month.value=""
  form1.day.value=""
  form1.year.value=""
  form1.lmp.value=""
  form1.weeksToday.value=""
  form1.dueDate.value=""
  form1.weeksLeft.value=""
  form1.at20Weeks.value=""
  form1.at30Weeks.value=""
  form1.atGivenWeeks.value=""
  defaults()
}



function init_array() {
	this.length = init_array.arguments.length;
	for (i = 0; i < this.length; i++)
		this[i+1] = init_array.arguments[i];
}
