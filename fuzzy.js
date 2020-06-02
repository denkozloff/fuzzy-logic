const Angle = {
    VPOS: 120, // Very Positive
    POS: 60, // Positive
    NO: 0, // Null
    NEG: -60, // Negative
    VNEG: -120 // Very Negative
};

const CartForce = {
    VPOS: 30, // Very Positive
    POS: 15, // Positive
    NO: 0, // Null
    NEG: -15, // Negative
    VNEG: -30 // Very Negative
};

// Op types
const AND = 0;
const OR = 1;

var rules = [
    { angle: 120, op: 0, force: 30, z: -30 },
    { angle: 120, op: 0, force: 15, z: -30 },
    { angle: 120, op: 0, force: 0, z: -30 },
    { angle: 120, op: 0, force: -15, z: -15 },
    { angle: 120, op: 0, force: -30, z: 0 },

    { angle: 60, op: 0, force: 30, z: -30 },
    { angle: 60, op: 0, force: 15, z: -30 },
    { angle: 60, op: 0, force: 0, z: -15 },
    { angle: 60, op: 0, force: -15, z: 0 },
    { angle: 60, op: 0, force: -30, z: 15 },

    { angle: 0, op: 0, force: 30, z: -15 },
    { angle: 0, op: 0, force: 15, z: -15 },
    { angle: 0, op: 0, force: 0, z: 0 },
    { angle: 0, op: 0, force: -15, z: 15 },
    { angle: 0, op: 0, force: -30, z: 15 },

    { angle: -60, op: 0, force: 30, z: -15 },
    { angle: -60, op: 0, force: 15, z: 0 },
    { angle: -60, op: 0, force: 0, z: 15 },
    { angle: -60, op: 0, force: -15, z: 30 },
    { angle: -60, op: 0, force: -30, z: 30 },

    { angle: -120, op: 0, force: 30, z: 0 },
    { angle: -120, op: 0, force: 15, z: 15 },
    { angle: -120, op: 0, force: 0, z: 30 },
    { angle: -120, op: 0, force: -15, z: 30 },
    { angle: -120, op: 0, force: -30, z: 30 }
];

function addRule(angle, op, force, z) {
    rules.push({angle, op, force, z});
}

function MIN(a, b) {
    if (a < b) {
        return a;
    }

    return b;
}

function MAX(a, b) {
    if (a > b) {
        return a;
    }

    return b;
}

function TriangleMemberShipForce(x, m) {
    const a = m - 15;
    const b = m + 15;

    return TriangleMemberShip(x, a, b, m);
}

function TriangleMemberShipAngle(x, m) {
    const a = m - 60;
    const b = m + 60;

    return TriangleMemberShip(x, a, b, m);
}

function TriangleMemberShip(x, a, b, m) {
    let mu = 0;
    if (a < x && x <= m) {
        mu = (x - a) / (m - a);
    } else if (m < x && x < b) {
        mu = (b - x) / (b - m);
    }

    return mu;
}

function ProcessRules(angle, force) {
    let summ_alpha_c = 0, summ_alpha = 0;

    if (angle > 180) {
        angle = (angle - 180) * (-1);
    }

    for (let i = 0; i < rules.length; i++) {
        const muAngle = TriangleMemberShipAngle(angle, rules[i].angle);
        const muCartForce = TriangleMemberShipForce(force, rules[i].force);

        const alpha = rules[i].op == 0 ? MIN(muAngle, muCartForce) : MAX(muAngle, muCartForce);
        if (alpha === 0) {
            continue;
        }

        summ_alpha_c += (alpha * rules[i].z);
        summ_alpha += alpha;
    }

    return summ_alpha_c / summ_alpha;
}

function InitRules() {

    // for (let termA in Angle) {
    //     for (let termB in CartForce) {
    //         addRule(Angle[termA], AND, CartForce[termB], 1);
    //     }
    // }

    //console.log(rules);

    //console.log("fuzzy-output:", ProcessRules(170, 1));
}

InitRules();
