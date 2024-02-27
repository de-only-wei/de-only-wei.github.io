//const testButton = document.getElementById("testButton");
const services = new Map([
    [0, "Adobe Sign"],
    [1, "Kuali Build"],
    [2, "Qualtrics"],
    [3, "Google Form"],
    [4, "On Base"]
]);
const capabilities = new Map([
    [0, "Form"],
    [1, "Workflow"],
    [2, "E-Signature"],
    [3, "Form Approval"],
    [4, "Authentication"],
    [5, "Community"],
    [6, "Attachment Upload"],
    [7, "Custom Form Format"],
    [8, "Legal Strictness"],
    [9, "Data Dashboard"],
    [10, "Reporting (Analytics)"],
    [11, "Integration to Google Sheet (POST)"],
    [12, "Integration to Google Sheet (GET)"],
    [13, "Integrations to PeopleSoft (POST)"],
    [14, "Integrations to PeopleSoft (GET)"],
    [15, "Integrations to Third Party System (POST)"],
    [16, "Integrations to Third Party System (GET)"],
    [17, "Document History"],
    [18, "Document Repository"],
    [19, "Document Retrieval"],
    [20, "Workflow Flexibility"],
    [21, "Auto-fill Form Fields"],
    [22, "Workflow Branching"],
    [23, "Email Notifications"],
    [24, "Email Reminders"],
    [25, "Custom Messaging"],
    [26, "Response Validation"],
    [27, "Custom Code"],
    [28, "Mobile Friendly"]
]);

const boolNeeds =  [1, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 1];
const boolNeeds1 = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1];
const needs =      [4, 3, 4, 1, 1, 1, 2, 2, 1, 3, 5, 5, 3, 5, 5, 3, 5, 3, 5, 3, 5, 3, 1, 3, 2, 3, 1, 4, 5];
const minimumNeeds = [[0, 2], [5, 5]]
let isAdd = true;
const featurematrix = [
    [2, 3, 3, 5, 1],
    [5, 4, 3, 0, 1],
    [5, 5, 4, 0, 0],
    [4, 5, 0, 0, 1],
    [0, 0, 0, 0, 0],
    [5, 5, 5, 5, 0],
    [4, 5, 5, 5, 3],
    [5, 1, 0, 5, 1],
    [5, 0, 0, 0, 1],
    [0, 0, 5, 5, 2],
    [0, 0, 4, 3, 2],
    [2, 3, 5, 4, 2],
    [0, 3, 0, 3, 0],
    [2, 2, 2, 3, 2],
    [0, 2, 0, 3, 5],
    [1, 1, 2, 2, 1],
    [0, 2, 0, 3, 0],
    [0, 5, 0, 0, 1],
    [0, 0, 0, 0, 0],
    [5, 2, 0, 0, 2],
    [5, 4, 4, 0, 3],
    [0, 5, 3, 0, 2],
    [0, 4, 3, 0, 2],
    [4, 5, 4, 0, 1],
    [4, 5, 4, 0, 4],
    [5, 5, 3, 0, 3],
    [5, 3, 5, 3, 2],
    [0, 0, 3, 0, 1],
    [0, 0, 0, 0, 0]
];
function scoreCalculationAdd(needs) {
    let score = [];
    for (let column = 0; column < featurematrix[0].length; column++) {
        let columnSum = 0;
        for (let row = 0; row < featurematrix.length; row++) {
            columnSum += (featurematrix[row][column] + needs[row]);
        }
        score[column] = columnSum;
    }
    return score;
}
function scoreCalculationMul(needs) {
    let score = [];
    for (let column = 0; column < featurematrix[0].length; column++) {
        let columnSum = 0;
        for (let row = 0; row < featurematrix.length; row++) {
            columnSum += (featurematrix[row][column] * needs[row]);
        }
        score[column] = columnSum;
    }
    return score;
}
function scoreCalculation2(minimumNeeds, needs) {
    let score = [];
    for (let column = 0; column < featurematrix[0].length; column++) {
        let columnSum = 0;
        checkingeachrow:
        for (let row = 0; row < featurematrix.length; row++) {
            let hasMinNeed = false;
            //iterating minimum needs array
            for (let index = 0; index < minimumNeeds.length; index++) {
                //check on minimum needs
                if (row === minimumNeeds[index][0]) {
                    if (featurematrix[row][column] >= minimumNeeds[index][1]) {
                        //pick larger value
                        (needs[row] > minimumNeeds[index][1]) ? columnSum += (featurematrix[row][column] * needs[row]) : columnSum += (featurematrix[row][column] * minimumNeeds[index][1]);
                    } else {
                        columnSum = 0;
                        score[column] = columnSum;

                        break checkingeachrow;
                    }
                    hasMinNeed = true;
                }

            }
            if (!hasMinNeed) {
                columnSum += (featurematrix[row][column] * needs[row]);
            }
        }
        score[column] = columnSum;
    }
    return score;
}
function L1(needs) {
    const score = scoreCalculationMul(needs);
    console.log(score);
    Max(score);
}
function L2(needs, isAdd) {
    let score = [];
    (isAdd) ? score = scoreCalculationAdd(needs) : score = scoreCalculationMul(needs);
    console.log(score);
    Max(score);
}
function L3(minimumNeeds, needs) {
    const score = scoreCalculation2(minimumNeeds, needs);
    console.log(score);
    Max(score);
}
function Max(score) {
    let max_val = Math.max.apply(null, score);
    console.log('Best Service: ' + services.get(score.indexOf(max_val)) + ' = ' + max_val);
}
function mapCapabilities(minimumNeeds) {
    console.log('Minimum Needs: ');
    for (let i = 0; i < minimumNeeds.length; i++) {
        console.log(capabilities.get(minimumNeeds[i][0]) + ': ' + minimumNeeds[i][1]);
    }
    console.log('------------------');
}
// testButton.addEventListener("click", () => {
//     mapCapabilities(minimumNeeds);
//     L1(boolNeeds1);
//     L2(needs);
//     L3(minimumNeeds, boolNeeds1);
// });
mapCapabilities(minimumNeeds);
console.log('L1: ');
L1(boolNeeds1);

console.log('L2: ');
L2(boolNeeds1, isAdd);
L2(needs, !isAdd);

console.log('L3: ');
L3(minimumNeeds, boolNeeds1);

console.log('L3: ');
L3(minimumNeeds, needs);