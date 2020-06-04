var box2d = {
    b2Vec2 : Box2D.Common.Math.b2Vec2,
    b2BodyDef : Box2D.Dynamics.b2BodyDef,
    b2Body : Box2D.Dynamics.b2Body,
    b2FixtureDef : Box2D.Dynamics.b2FixtureDef,
    b2Fixture : Box2D.Dynamics.b2Fixture,
    b2World : Box2D.Dynamics.b2World,
    b2MassData : Box2D.Collision.Shapes.b2MassData,
    b2PolygonShape : Box2D.Collision.Shapes.b2PolygonShape,
    b2CircleShape : Box2D.Collision.Shapes.b2CircleShape,
    b2DebugDraw : Box2D.Dynamics.b2DebugDraw,

    b2AABB : Box2D.Collision.b2AABB,
    b2MouseJointDef : Box2D.Dynamics.Joints.b2MouseJointDef,
    b2RevoluteJointDef : Box2D.Dynamics.Joints.b2RevoluteJointDef,
    b2PrismaticJointDef : Box2D.Dynamics.Joints.b2PrismaticJointDef
};

var SCALE = 30;
var PI = Math.PI
var TWO_PI = Math.PI*2;
var canvas, world;

var jointAngleField, cartVelocityField, fuzzyOutputField;

var cartBody, pendulumBody, revoluteJoint;

function init() {
    // Define the canvas
    canvas = document.getElementById("canvas");
    jointAngleField = document.getElementById("jointAngle");
    cartVelocityField = document.getElementById("cartVelocity");
    fuzzyOutputField = document.getElementById("fuzzyOutput");

    setupPhysics();
}

function setupPhysics() {
    // Define the world
    var gravity = new box2d.b2Vec2(0, 8);
    var doSleep = true;
    world = new box2d.b2World(gravity, doSleep);

    var fixDef = new box2d.b2FixtureDef;
    fixDef.density = 1.0;
    fixDef.friction = 0.5;
    fixDef.restitution = 0.2;

    var cartRailFixtureDef = new box2d.b2FixtureDef;
    cartRailFixtureDef.density = 1.0;
    cartRailFixtureDef.friction = 0.5;
    cartRailFixtureDef.restitution = 0.2;
    cartRailFixtureDef.shape = new box2d.b2PolygonShape;

    var cartFixtureDef = new box2d.b2FixtureDef;
    cartFixtureDef.density = 0.8;
    cartFixtureDef.friction = 0.5;
    cartFixtureDef.restitution = 0.2;
    cartFixtureDef.shape = new box2d.b2PolygonShape;

    var pendulumArmFixtureDef = new box2d.b2FixtureDef;
    pendulumArmFixtureDef.density = 0.1;
    pendulumArmFixtureDef.friction = 0.5;
    pendulumArmFixtureDef.restitution = 0.2;
    pendulumArmFixtureDef.shape = new box2d.b2PolygonShape;
    //pendulumArmFixtureDef.shape = new box2d.b2CircleShape;
    pendulumArmFixtureDef.filter.maskBits = 0x0000; // disable collision with other bodies

    var bodyDef = new box2d.b2BodyDef;
    var cartRailBodyDef = new box2d.b2BodyDef;
    var cartBodyDef     = new box2d.b2BodyDef;
    var pendulumBodyDef = new box2d.b2BodyDef;

    //create ground
    bodyDef.type = box2d.b2Body.b2_staticBody;
    bodyDef.position.x = 400 / SCALE;
    bodyDef.position.y = 600 / SCALE;
    fixDef.shape = new box2d.b2PolygonShape();
    fixDef.shape.SetAsBox(400 / SCALE, 10 / SCALE);
    world.CreateBody(bodyDef).CreateFixture(fixDef);

    // cart rail
    cartRailBodyDef.type = box2d.b2Body.b2_staticBody;
    cartRailFixtureDef.shape.SetAsBox(350 / SCALE, 5 / SCALE);
    cartRailBodyDef.position.x = 400 / SCALE;
    cartRailBodyDef.position.y = 300 / SCALE;
    var cartRailBody = world.CreateBody(cartRailBodyDef);
    cartRailBody.CreateFixture(cartRailFixtureDef)

    // cart
    cartBodyDef.type = box2d.b2Body.b2_dynamicBody;
    cartFixtureDef.shape.SetAsBox(30 / SCALE, 30 / SCALE);
    cartBodyDef.position.Set(400 / SCALE, 0);
    cartBody = world.CreateBody(cartBodyDef);
    cartBody.CreateFixture(cartFixtureDef);

    // joint between cart and cart rail
    var prismaticJointDef = new box2d.b2PrismaticJointDef();
    prismaticJointDef.bodyA = cartRailBody;
    prismaticJointDef.bodyB = cartBody;
    prismaticJointDef.lowerTranslation = -10;
    prismaticJointDef.upperTranslation = 10;
    prismaticJointDef.enableLimit = true;
    prismaticJointDef.localAnchorA = new box2d.b2Vec2(0,0);
    prismaticJointDef.localAnchorB = new box2d.b2Vec2(0,0);
    prismaticJointDef.localAxisA = new box2d.b2Vec2(1,0);
    var prismaticJoint = world.CreateJoint(prismaticJointDef);

    // pendulum
    pendulumBodyDef.type = box2d.b2Body.b2_dynamicBody;
    pendulumArmFixtureDef.shape.SetAsBox(15 / SCALE, 15 / SCALE);
    pendulumBodyDef.position.Set(400 / SCALE, 0);
    pendulumBody = world.CreateBody(pendulumBodyDef);
    pendulumBody.CreateFixture(pendulumArmFixtureDef)

    // joint between cart and pendulum
    var revoluteJointDef = new box2d.b2RevoluteJointDef();
    revoluteJointDef.bodyA = cartBody;
    revoluteJointDef.bodyB = pendulumBody;
    revoluteJointDef.enableLimit = false;
    revoluteJointDef.localAnchorA = new box2d.b2Vec2(0,0);
    revoluteJointDef.localAnchorB = new box2d.b2Vec2(0,4);
    revoluteJointDef.localAxisA = new box2d.b2Vec2(10,30);
    revoluteJoint = world.CreateJoint(revoluteJointDef);

    // Setup debug draw
    var debugDraw = new box2d.b2DebugDraw();
    debugDraw.SetSprite(canvas.getContext("2d"));
    debugDraw.SetDrawScale(SCALE);
    debugDraw.SetFlags(box2d.b2DebugDraw.e_shapeBit | box2d.b2DebugDraw.e_jointBit);
    world.SetDebugDraw(debugDraw);

    window.setInterval(update, 60/100);
}

var mouseX, mouseY, mousePVec, isMouseDown, selectedBody, mouseJoint;
var canvasPosition = getElementPosition(document.getElementById("canvas"));

function handleMouseDown(e) {
    isMouseDown = true;
    handleMouseMove(e);
    document.addEventListener("mousemove", handleMouseMove, true);
    document.addEventListener("touchmove", handleMouseMove, true);
}

document.addEventListener("mousedown", handleMouseDown, true);
document.addEventListener("touchstart", handleMouseDown, true);

function handleMouseUp() {
    document.removeEventListener("mousemove", handleMouseMove, true);
    document.removeEventListener("touchmove", handleMouseMove, true);
    isMouseDown = false;
    mouseX = undefined;
    mouseY = undefined;
}

document.addEventListener("mouseup", handleMouseUp, true);
document.addEventListener("touchend", handleMouseUp, true);

function handleMouseMove(e) {
    var clientX, clientY;
    if(e.clientX)
    {
        clientX = e.clientX;
        clientY = e.clientY;
    }
    else if(e.changedTouches && e.changedTouches.length > 0)
    {
        var touch = e.changedTouches[e.changedTouches.length - 1];
        clientX = touch.clientX;
        clientY = touch.clientY;
    }
    else
    {
        return;
    }
    mouseX = (clientX - canvasPosition.x) / 30;
    mouseY = (clientY - canvasPosition.y) / 30;
    e.preventDefault();
};

function getBodyAtMouse() {
    mousePVec = new box2d.b2Vec2(mouseX, mouseY);
    var aabb = new box2d.b2AABB();
    aabb.lowerBound.Set(mouseX - 0.001, mouseY - 0.001);
    aabb.upperBound.Set(mouseX + 0.001, mouseY + 0.001);

    // Query the world for overlapping shapes.

    selectedBody = null;
    world.QueryAABB(getBodyCB, aabb);
    return selectedBody;
}

function getBodyCB(fixture) {
    if(fixture.GetBody().GetType() != box2d.b2Body.b2_staticBody) {
        if(fixture.GetShape().TestPoint(fixture.GetBody().GetTransform(), mousePVec)) {
            selectedBody = fixture.GetBody();
            return false;
        }
    }
    return true;
}

function update() {
    if(isMouseDown && (!mouseJoint)) {
        var body = getBodyAtMouse();
        if(body) {
            var md = new box2d.b2MouseJointDef();
            md.bodyA = world.GetGroundBody();
            md.bodyB = body;
            md.target.Set(mouseX, mouseY);
            md.collideConnected = true;
            md.maxForce = 300.0 * body.GetMass();
            mouseJoint = world.CreateJoint(md);
            body.SetAwake(true);
        }
    }

    if(mouseJoint) {
        if(isMouseDown) {
            mouseJoint.SetTarget(new box2d.b2Vec2(mouseX, mouseY));
        } else {
            world.DestroyJoint(mouseJoint);
            mouseJoint = null;
        }
    }

    var jointAngle = normalizeAngle(revoluteJoint.GetJointAngle());
    var jointAngleDeg = radToDegree(jointAngle);
    var cartVelocity = cartBody.GetLinearVelocity();
    var angularVelocity = pendulumBody.GetAngularVelocity()

    jointAngleField.innerText = jointAngleDeg;
    cartVelocityField.innerText = angularVelocity;

    var fuzzyOutput = ProcessRules(jointAngleDeg, angularVelocity);

    fuzzyOutputField.innerText = fuzzyOutput;

    //console.log("pendulumBodyAngularVelocity", pendulumBody.GetAngularVelocity());

    if (fuzzyOutput) {
        //fuzzyOutput *= 0.5;
        cartBody.ApplyForce(new box2d.b2Vec2(fuzzyOutput, 0), cartBody.GetWorldCenter());
    }

    world.DrawDebugData();
    world.Step(1/60, 10, 10);
    world.ClearForces();
}

function getElementPosition(element) {
    var elem=element, tagname="", x=0, y=0;

    while((typeof(elem) == "object") && (typeof(elem.tagName) != "undefined")) {
        y += elem.offsetTop;
        x += elem.offsetLeft;
        tagname = elem.tagName.toUpperCase();

        if(tagname == "BODY")
            elem=0;

        if(typeof(elem) == "object") {
            if(typeof(elem.offsetParent) == "object")
                elem = elem.offsetParent;
        }
    }

    return {x: x, y: y};
}

function normalizeAngle(angle) {
    while (angle > TWO_PI) {
        angle -= TWO_PI;
    }
    while (angle < 0) {
        angle += TWO_PI;
    }
    return angle;
}

function radToDegree(rad) {
    var degree = rad * 180/PI;
    return degree;
}