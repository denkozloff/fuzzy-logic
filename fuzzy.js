const Angle = {
    NOP: 0, // Null
    SP: 45, // Small positive
    MP: 90, // Medium positive
    LP: 135, // Large positive
    VLP: 180, // Very large positive

    VLN: 180, // Very large negative
    LN: 225, // Large negative
    MN: 270, // Medium negative
    SN: 315, // Small negative
    NON: 360 // Null
};

const AngularVelocity = {
    VLP: 20, // Very large positive
    VP: 15, // Very positive
    MP: 10, // Medium positive
    SP: 5, // Small positive
    NO: 0, // No
    SN: -5, // Small negative
    MN: -10, // Medium negative
    VN: -15, // Very negative
    VLN: -20 // Very large negative
};

// Op types
const AND = 0;
const OR = 1;

var rules = [
    { angle: 0, op: 0, angularVelocity: 20, z: 0 },
    { angle: 0, op: 0, angularVelocity: 15, z: 0 },
    { angle: 0, op: 0, angularVelocity: 10, z: 0 },
    { angle: 0, op: 0, angularVelocity: 5, z: 0 },
    { angle: 0, op: 0, angularVelocity: 0, z: 0 },
    { angle: 0, op: 0, angularVelocity: -5, z: 0 },
    { angle: 0, op: 0, angularVelocity: -10, z: 0 },
    { angle: 0, op: 0, angularVelocity: -15, z: 0 },
    { angle: 0, op: 0, angularVelocity: -20, z: 0 },

    { angle: 45, op: 0, angularVelocity: 20, z: 0 },
    { angle: 45, op: 0, angularVelocity: 15, z: 0 },
    { angle: 45, op: 0, angularVelocity: 10, z: 70 },
    { angle: 45, op: 0, angularVelocity: 5, z: 70 },
    { angle: 45, op: 0, angularVelocity: 0, z: 300 },
    { angle: 45, op: 0, angularVelocity: -5, z: -70 },
    { angle: 45, op: 0, angularVelocity: -10, z: -70 },
    { angle: 45, op: 0, angularVelocity: -15, z: 0 },
    { angle: 45, op: 0, angularVelocity: -20, z: -0 },

    { angle: 90, op: 0, angularVelocity: 20, z: 10 },
    { angle: 90, op: 0, angularVelocity: 15, z: 10 },
    { angle: 90, op: 0, angularVelocity: 10, z: 10 },
    { angle: 90, op: 0, angularVelocity: 5, z: 10 },
    { angle: 90, op: 0, angularVelocity: 0, z: 0 },
    { angle: 90, op: 0, angularVelocity: -5, z: 10 },
    { angle: 90, op: 0, angularVelocity: -10, z: 10 },
    { angle: 90, op: 0, angularVelocity: -15, z: 10 },
    { angle: 90, op: 0, angularVelocity: -20, z: 10 },

    { angle: 135, op: 0, angularVelocity: 20, z: 5 },
    { angle: 135, op: 0, angularVelocity: 15, z: 5 },
    { angle: 135, op: 0, angularVelocity: 10, z: 5 },
    { angle: 135, op: 0, angularVelocity: 5, z: 5 },
    { angle: 135, op: 0, angularVelocity: 0, z: 0 },
    { angle: 135, op: 0, angularVelocity: -5, z: -5 },
    { angle: 135, op: 0, angularVelocity: -10, z: -5 },
    { angle: 135, op: 0, angularVelocity: -15, z: -5 },
    { angle: 135, op: 0, angularVelocity: -20, z: -5 },

    { angle: 180, op: 0, angularVelocity: 20, z: 10 },
    { angle: 180, op: 0, angularVelocity: 15, z: 10 },
    { angle: 180, op: 0, angularVelocity: 10, z: 10 },
    { angle: 180, op: 0, angularVelocity: 5, z: 50 },
    { angle: 180, op: 0, angularVelocity: 0, z: 0 },
    { angle: 180, op: 0, angularVelocity: -5, z: -50 },
    { angle: 180, op: 0, angularVelocity: -10, z: -10 },
    { angle: 180, op: 0, angularVelocity: -15, z: -10 },
    { angle: 180, op: 0, angularVelocity: -20, z: -10 },

    { angle: 225, op: 0, angularVelocity: 20, z: -5 },
    { angle: 225, op: 0, angularVelocity: 15, z: -5 },
    { angle: 225, op: 0, angularVelocity: 10, z: -5 },
    { angle: 225, op: 0, angularVelocity: 5, z: -5 },
    { angle: 225, op: 0, angularVelocity: 0, z: 0 },
    { angle: 225, op: 0, angularVelocity: -5, z: 5 },
    { angle: 225, op: 0, angularVelocity: -10, z: 5 },
    { angle: 225, op: 0, angularVelocity: -15, z: 5 },
    { angle: 225, op: 0, angularVelocity: -20, z: 5 },

    { angle: 270, op: 0, angularVelocity: 20, z: 10 },
    { angle: 270, op: 0, angularVelocity: 15, z: 10 },
    { angle: 270, op: 0, angularVelocity: 10, z: 10 },
    { angle: 270, op: 0, angularVelocity: 5, z:  10 },
    { angle: 270, op: 0, angularVelocity: 0, z: 0 },
    { angle: 270, op: 0, angularVelocity: -5, z: 10 },
    { angle: 270, op: 0, angularVelocity: -10, z: 10 },
    { angle: 270, op: 0, angularVelocity: -15, z: 10 },
    { angle: 270, op: 0, angularVelocity: -20, z: 10 },

    { angle: 315, op: 0, angularVelocity: 20, z: 0 },
    { angle: 315, op: 0, angularVelocity: 15, z: 0 },
    { angle: 315, op: 0, angularVelocity: 10, z: 70 },
    { angle: 315, op: 0, angularVelocity: 5, z: 70 },
    { angle: 315, op: 0, angularVelocity: 0, z: -300 },
    { angle: 315, op: 0, angularVelocity: -5, z: -70 },
    { angle: 315, op: 0, angularVelocity: -10, z: -70 },
    { angle: 315, op: 0, angularVelocity: -15, z: 0 },
    { angle: 315, op: 0, angularVelocity: -20, z: -0 },

    { angle: 360, op: 0, angularVelocity: 20, z: 0 },
    { angle: 360, op: 0, angularVelocity: 15, z: 0 },
    { angle: 360, op: 0, angularVelocity: 10, z: 0 },
    { angle: 360, op: 0, angularVelocity: 5, z: 0 },
    { angle: 360, op: 0, angularVelocity: 0, z: 0 },
    { angle: 360, op: 0, angularVelocity: -5, z: 0 },
    { angle: 360, op: 0, angularVelocity: -10, z: 0 },
    { angle: 360, op: 0, angularVelocity: -15, z: 0 },
    { angle: 360, op: 0, angularVelocity: -20, z: 0 }
];

function addRule(angle, op, angularVelocity, z) {
    rules.push({angle, op, angularVelocity, z});
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

function TriangleMemberShipVelocity(x, m) {
    const a = m - 3;
    const b = m + 3;

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

function ProcessRules(angle, angularVelocity) {
    let summ_alpha_c = 0, summ_alpha = 0;

    for (let i = 0; i < rules.length; i++) {
        const muAngle = TriangleMemberShipAngle(angle, rules[i].angle);
        const muCartVelocity = TriangleMemberShipVelocity(angularVelocity, rules[i].angularVelocity);

        const alpha = rules[i].op == 0 ? MIN(muAngle, muCartVelocity) : MAX(muAngle, muCartVelocity);
        if (alpha === 0) {
            continue;
        }

        summ_alpha_c += (alpha * rules[i].z);
        summ_alpha += alpha;
    }

    return summ_alpha_c / summ_alpha;
}

// function InitRules() {

    // for (let termA in Angle) {
    //     for (let termB in AngularVelocity) {
    //         let rule = { angle: Angle[termA], op: AND, angularVelocity: AngularVelocity[termB], z: 1 };
    //         addRule(rule);
    //     }
    // }

// }

