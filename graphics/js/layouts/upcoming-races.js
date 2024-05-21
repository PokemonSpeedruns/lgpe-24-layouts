let runDataActiveRun = nodecg.Replicant('runDataActiveRun', 'nodecg-speedcontrol');
let runDataArray = nodecg.Replicant('runDataArray', 'nodecg-speedcontrol');

NodeCG.waitForReplicants(runDataActiveRun, runDataArray).then(loadFromSpeedControl);

function loadFromSpeedControl() {
	runDataActiveRun.on('change', (newVal, oldVal) => {
		refreshNextRacesData(newVal);
	});

	runDataArray.on('change', (newVal, oldVal) => {
		refreshNextRacesData(runDataActiveRun.value);
	});
}

function refreshNextRacesData(currentRace) {
	const numberOfRaces = $('.on-deck-info-container').length;
	let nextRaces = getNextRaces(currentRace, numberOfRaces);

	let i = 0;
	for (let race of nextRaces) {
		if (i >= numberOfRaces) {
			break;
		}
		
		let onDeckRunners = '#on-deck-info' + (i + 1);
		let onDeckStart = '#on-deck-start' + (i + 1);
		let onDeckChannel = '#on-deck-channel' + (i + 1);

		getNamesForRun(race).forEach((runner, index) => fadeHtml(onDeckRunners + "-runner" + (index + 1), runner, true));

		if (race.customData.raceTime == undefined) {
			fadeHtml(onDeckStart, 'TBD', true);
		} else {
			fadeHtml(onDeckStart, race.customData.raceTime + ' ET', true);
		}

		if (race.customData.channel == undefined) {
			fadeHtml(onDeckChannel, 'TBD', true);
		} else {
			fadeHtml(onDeckChannel, race.customData.channel, true);
		}

		i += 1;
	}
}

function getNextRaces(runData, amount) {
	let nextRaces = [];
	let indexOfCurrentRace = findIndexInRunDataArray(runData);
	for (let i = 1; i <= amount; i++) {
		if (!runDataArray.value[indexOfCurrentRace + i]) {
			break;
		}
		nextRaces.push(runDataArray.value[indexOfCurrentRace + i]);
	}
	return nextRaces;
}

function findIndexInRunDataArray(run) {
	let indexOfRun = -1;
	if (run) {
		for (let i = 0; i < runDataArray.value.length; i++) {
			if (run.id === runDataArray.value[i].id) {
				indexOfRun = i; break;
			}
		}
	}
	return indexOfRun;
}
