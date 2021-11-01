// -----JS CODE-----
// @input vec3 speedVector 
//
//
var cube = script.getSceneObject(); 
var transform  = cube.getTransform(); 
var updateEvent = script.createEvent("UpdateEvent");


function onUpdateEvent(eventData) {
    var pos = transform.getLocalPosition();
    var delta = script.speedVector.uniformScale(eventData.getDeltaTime()); 
    pos = pos.add(delta);
    transform.setLocalPosition(pos);        
}

function init() {  
    script.createEvent("UpdateEvent").bind(onUpdateEvent);
}

init(); 
