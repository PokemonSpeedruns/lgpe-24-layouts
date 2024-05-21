'use strict';

$(() => {

	loadFromSpeedControl();

	function loadFromSpeedControl() {
		const speedcontrolBundle = 'nodecg-speedcontrol';

		let runDataActiveRun = nodecg.Replicant('runDataActiveRun', speedcontrolBundle);
		runDataActiveRun.on('change', (newVal) => {
			if (newVal)
				updateSceneFields(newVal);
		});

		function updateSceneFields(runData) {
			let currentTeamsData = runData.teams;
			let customData = runData.customData;

			// Reset all runner data.
			$('.runner-name').add('.pronouns').text('');

			let i = 0;

			for (let team of currentTeamsData) {
				for (let player of team.players) {
					// Update runner name.
					fadeText('#runner-name' + (i + 1), player.name, true);

					// Update pronouns.
					let pronouns = player.pronouns;
					if (pronouns === undefined) {
						$('#pronouns' + (i + 1)).hide();
					} else {
						$('#pronouns' + (i + 1)).show();
						fadeText('#pronouns' + (i + 1), pronouns, true);
					}

					// Update game.
					$('#game-img' + (i + 1)).attr('src', 'img/logos/' + player.customData.runnerGame + '.png');

					// Update system.
					$('#system-img' + (i + 1)).attr('src', 'img/logos/' + player.customData.runnerSystem + '.png');

					i += 1;
				}
			}

			// Reset all comms data.
			$('.comms-name').add('.comms-pronouns').text('');

			// Update comms names, pronouns and round.
			Object.entries(customData).map(([key, val] = entry) => {
				// The key here maps to the HTML element ID.
				fadeText('#' + key, val, true);
			});
		}
	}
});
