// -----JS CODE-----
// @input Component.ManipulateComponent manipulate 
// @input Component.ScriptComponent physicsMesh

// Creates events for Manipulate Start and Manipulate End events
var manipulating = true;

function manipStart(eventData)
{
    manipulating = true; 
}

var manipStartEvent = script.createEvent("ManipulateStartEvent");
manipStartEvent.bind(manipStart);

function manipEnd(eventData)
{
    manipulating = false;
}

var manipEndEvent = script.createEvent("ManipulateEndEvent");
manipEndEvent.bind(manipEnd);