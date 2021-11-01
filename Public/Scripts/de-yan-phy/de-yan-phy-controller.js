//@input SceneObject floor
//@input SceneObject[] meshes
//@input SceneObject camera
//@input SceneObject draggableObject 


global.touchSystem.touchBlocking = true

var delayedEvent = script.createEvent('DelayedCallbackEvent')
delayedEvent.bind(function(eventData) {
  init()
})
delayedEvent.reset(0.1)

function init() {
  var CannonHelper = global.Physics.DeYanPhysics; 

  var floor = CannonHelper.makeFloor()

  var worldObjects = [
    // { sceneObject: script.box, physicsObject: box },
    { sceneObject: script.floor, physicsObject: floor }
  ]

  // using the scripts attached to the scene objects for setup
  script.meshes.forEach(function(mesh) {
    print(mesh);
    if (mesh.getComponentCount('Component.ScriptComponent') > 0) {
      var meshSettings = mesh.getFirstComponent('Component.ScriptComponent')

      var shape
      if (meshSettings.api.shapeType == 'sphere') {
        shape = CannonHelper.makeSphere(meshSettings.api.size, meshSettings.api.position, meshSettings.api.rotation)
      } else {
        shape = CannonHelper.makeBox(meshSettings.api.size, meshSettings.api.position, meshSettings.api.rotation)
      }

      worldObjects.push({ sceneObject: mesh, physicsObject: shape })
    } else {
      print('scene object is missing a script componenet, add the physicsMesh script')
    }
  })

  // adding objects manuallly using the original Cannon module
    var cannon = new CannonHelper(worldObjects)
    var originalCannon = cannon.CANNON

    var dragMeshSetting = script.draggableObject.getComponent("Component.ScriptComponent");
    var draggablePosition =  dragMeshSetting.api.position; 
    var draggableScale = dragMeshSetting.api.size;
    print(draggableScale);
    var draggable = new originalCannon.Body({
        mass: 0.3,
        position: new originalCannon.Vec3(draggablePosition.x, draggablePosition.y, draggablePosition.z),
        shape: new originalCannon.Box(new originalCannon.Vec3(draggableScale.x, draggableScale.y, draggableScale.z)),
        DYNAMIC: 1,  
        linearDamping: 0.1,
    });

    cannon.world.addBody(draggable); 
    


  var event = script.createEvent('UpdateEvent')
  event.bind(function(eventData) {

    cannon.update(); 
    cannon.syncSceneObject(script.draggableObject.getTransform(), draggable); 
    
  })
}
