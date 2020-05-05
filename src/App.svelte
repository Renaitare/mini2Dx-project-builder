<style>
	input:checked + svg {
		display: block;
	}
</style>

<script>
	import { onMount } from 'svelte';
	const dialog = require('electron').remote.dialog;
	let versions = [];
	let templates = [];

	let name = 'my-mini2Dx-game';
	let identifier = 'com.mystudio.gamename';
	let classname = 'MyMini2DxGame';

	let buildscript = null;
	let version = null;
	let template = null;

	let projectDirectory = __dirname;
	let sdkDirectory = 'Path/To/SDK';

	let subprojects = {
		desktop: true,
		android: true,
		ios: true,
	};

	let extensions = {
		tiled: true,
		artemis: true,
		ui: true,
		messagebus: true,
		ai: false,
		tools: false,
		luascripting: false,
		groovyscripting: false,
		pythonscripting: false,
		rubyscripting: false,
	};

	onMount(async () => {
		const results = await fetch(
			'https://api.github.com/repos/mini2Dx/mini2Dx/releases'
		);
		versions = await results.json();
		version = versions[0].name.substring(1);
	});

	function handleProjectDirectory() {
		const path = dialog.showOpenDialogSync({
			properties: ['openDirectory'],
		});
		projectDirectory = path[0];
	}

	function handleSdkDirectory() {
		const path = dialog.showOpenDialogSync({
			properties: ['openDirectory'],
		});
		sdkDirectory = path[0];
	}
</script>

<div class="flex mb-4 p-4">
	<div class="w-1/3 h-12">
		<img class="-ml-3" src="images/logo.png" alt="Mini2Dx Logo" />
		<div
			class="-ml-1 mr-3 -mt-1 bg-teal-100 text-teal-700 px-2 py-3 rounded
			text-center">
			<p class="font-bold text-xl">Mini2Dx Project Builder</p>
		</div>
	</div>
	<div class="w-2/3 h-12">
		<form class="w-full">
			<div class="flex flex-wrap -mx-3 mb-6">
				<div class="w-full md:w-2/5 px-3 mb-6 md:mb-0">
					<label
						class="block uppercase tracking-wide text-gray-700
						text-xs font-bold mb-2"
						for="project-name">
						Project Name
					</label>
					<input
						class="appearance-none block w-full bg-gray-200
						text-gray-700 border border-gray-200 rounded py-3 px-4
						leading-tight focus:outline-none focus:bg-white
						focus:border-teal-500"
						id="project-name"
						type="text"
						placeholder="my-mini2Dx-game" />
				</div>
				<div class="w-full md:w-2/5 px-3">
					<label
						class="block uppercase tracking-wide text-gray-700
						text-xs font-bold mb-2"
						for="identifier">
						Identifier
					</label>
					<input
						class="appearance-none block w-full bg-gray-200
						text-gray-700 border border-gray-200 rounded py-3 px-4
						leading-tight focus:outline-none focus:bg-white
						focus:border-teal-500"
						id="identifier"
						type="text"
						placeholder="com.mystudio.gamename" />
				</div>
				<div class="w-full md:w-1/5 px-3 mb-6 md:mb-0">
					<label
						class="block uppercase tracking-wide text-gray-700
						text-xs font-bold mb-2"
						for="gradle-script-style">
						Gradle Script
					</label>
					<div class="relative">
						<select
							class="block appearance-none w-full bg-gray-200
							border border-gray-200 text-gray-700 py-3 px-4 pr-8
							rounded leading-tight focus:outline-none
							focus:bg-white focus:border-teal-500"
							id="gradle-script-style">
							<option>Groovy</option>
							<option>Kotlin</option>
						</select>
						<div
							class="pointer-events-none absolute inset-y-0
							right-0 flex items-center px-2 text-gray-700">
							<svg
								class="fill-current h-4 w-4"
								xmlns="http://www.w3.org/2000/svg"
								viewBox="0 0 20 20">
								<path
									d="M9.293 12.95l.707.707L15.657
									8l-1.414-1.414L10 10.828 5.757 6.586 4.343
									8z"></path>
							</svg>
						</div>
					</div>
				</div>
			</div>
			<div class="flex flex-wrap -mx-3 mb-6">
				<div class="w-full md:w-1/3 px-3">
					<label
						class="block uppercase tracking-wide text-gray-700
						text-xs font-bold mb-2"
						for="classname">
						Class Name
					</label>
					<input
						class="appearance-none block w-full bg-gray-200
						text-gray-700 border border-gray-200 rounded py-3 px-4
						leading-tight focus:outline-none focus:bg-white
						focus:border-teal-500"
						id="identifier"
						type="text"
						placeholder="MyMini2DxGame" />
				</div>
				<div class="w-full md:w-1/3 px-3 mb-6 md:mb-0">
					<label
						class="block uppercase tracking-wide text-gray-700
						text-xs font-bold mb-2"
						for="version">
						Mini2Dx Version
					</label>
					<div class="relative">
						<select
							class="block appearance-none w-full bg-gray-200
							border border-gray-200 text-gray-700 py-3 px-4 pr-8
							rounded leading-tight focus:outline-none
							focus:bg-white focus:border-teal-500"
							id="version">
							{#each versions as version}
								{#if version.name.startsWith('v2')}
									<option>{version.name.substring(1)}</option>
								{/if}
							{:else}
								<option>Couldn't Fetch Data</option>
							{/each}
						</select>
						<div
							class="pointer-events-none absolute inset-y-0
							right-0 flex items-center px-2 text-gray-700">
							<svg
								class="fill-current h-4 w-4"
								xmlns="http://www.w3.org/2000/svg"
								viewBox="0 0 20 20">
								<path
									d="M9.293 12.95l.707.707L15.657
									8l-1.414-1.414L10 10.828 5.757 6.586 4.343
									8z"></path>
							</svg>
						</div>
					</div>
				</div>
				<div class="w-full md:w-1/3 px-3 mb-6 md:mb-0">
					<label
						class="block uppercase tracking-wide text-gray-700
						text-xs font-bold mb-2"
						for="template">
						Template
					</label>
					<div class="relative">
						<select
							class="block appearance-none w-full bg-gray-200
							border border-gray-200 text-gray-700 py-3 px-4 pr-8
							rounded leading-tight focus:outline-none
							focus:bg-white focus:border-teal-500"
							id="template">
							{#each templates as template}
								{#if version.name.startsWith('v2')}
									<option>{version.name.substring(1)}</option>
								{/if}
							{:else}
								<option>Couldn't Fetch Data</option>
							{/each}
						</select>
						<div
							class="pointer-events-none absolute inset-y-0
							right-0 flex items-center px-2 text-gray-700">
							<svg
								class="fill-current h-4 w-4"
								xmlns="http://www.w3.org/2000/svg"
								viewBox="0 0 20 20">
								<path
									d="M9.293 12.95l.707.707L15.657
									8l-1.414-1.414L10 10.828 5.757 6.586 4.343
									8z"></path>
							</svg>
						</div>
					</div>
				</div>
			</div>
			<label
				class="block uppercase tracking-wide text-gray-700 text-xs
				font-bold mb-2"
				for="project-directory">
				Project Directory
			</label>
			<div class="flex items-center bg-gray-200 rounded py-2 mb-6">
				<input
					class="appearance-none bg-transparent border-none w-full
					text-gray-700 mr-3 ml-2 py-1 px-2 leading-tight
					focus:outline-none"
					type="text"
					placeholder="Path to Folder"
					aria-label="Project Directory"
					value="{projectDirectory}" />
				<button
					class="flex-shrink-0 bg-teal-500 hover:bg-teal-700
					border-teal-500 hover:border-teal-700 text-sm border-4
					text-white py-1 px-2 rounded mr-2"
					type="button"
					id="browse-button-project-directory"
					on:click="{handleProjectDirectory}">
					Browse
				</button>
			</div>
			<label
				class="block uppercase tracking-wide text-gray-700 text-xs
				font-bold mb-2"
				for="android-sdk-directory">
				Android SDK Directory
			</label>
			<div class="flex items-center bg-gray-200 rounded py-2 mb-6">
				<input
					class="appearance-none bg-transparent border-none w-full
					text-gray-700 mr-3 ml-2 py-1 px-2 leading-tight
					focus:outline-none"
					type="text"
					placeholder="Path to Folder"
					aria-label="Android SDK Directory"
					value="{sdkDirectory}" />
				<button
					class="flex-shrink-0 bg-teal-500 hover:bg-teal-700
					border-teal-500 hover:border-teal-700 text-sm border-4
					text-white py-1 px-2 rounded mr-2"
					type="button"
					id="browse-button-android-sdk-directory"
					on:click="{handleSdkDirectory}">
					Browse
				</button>
			</div>
			<label
				class="block uppercase tracking-wide text-gray-700 text-xs
				font-bold mb-2"
				for="subprojects">
				Subprojects
			</label>
			<div class="flex">
				<div class="w-1/3 h-12">
					<label class="flex justify-start items-start mr-12">
						<div
							class="bg-white border-2 rounded border-gray-400 w-6
							h-6 flex flex-shrink-0 justify-center items-center
							mr-2 focus-within:border-blue-500">
							<input
								type="checkbox"
								class="opacity-0 absolute"
								bind:checked="{subprojects.desktop}" />
							<svg
								class="fill-current hidden w-4 h-4
								text-green-500 pointer-events-none"
								viewBox="0 0 20 20">
								<path d="M0 11l2-2 5 5L18 3l2 2L7 18z"></path>
							</svg>
						</div>
						<div class="select-none">Desktop</div>
					</label>
				</div>
				<div class="w-1/3 h-12">
					<label class="flex justify-start items-start mr-12">
						<div
							class="bg-white border-2 rounded border-gray-400 w-6
							h-6 flex flex-shrink-0 justify-center items-center
							mr-2 focus-within:border-blue-500">
							<input
								type="checkbox"
								class="opacity-0 absolute"
								bind:checked="{subprojects.android}" />
							<svg
								class="fill-current hidden w-4 h-4
								text-green-500 pointer-events-none"
								viewBox="0 0 20 20">
								<path d="M0 11l2-2 5 5L18 3l2 2L7 18z"></path>
							</svg>
						</div>
						<div class="select-none">Android</div>
					</label>
				</div>
				<div class="w-1/3 h-12">
					<label class="flex justify-start items-start mr-12">
						<div
							class="bg-white border-2 rounded border-gray-400 w-6
							h-6 flex flex-shrink-0 justify-center items-center
							mr-2 focus-within:border-blue-500">
							<input
								type="checkbox"
								class="opacity-0 absolute"
								bind:checked="{subprojects.ios}" />
							<svg
								class="fill-current hidden w-4 h-4
								text-green-500 pointer-events-none"
								viewBox="0 0 20 20">
								<path d="M0 11l2-2 5 5L18 3l2 2L7 18z"></path>
							</svg>
						</div>
						<div class="select-none">iOS</div>
					</label>
				</div>
			</div>
			<label
				class="block uppercase tracking-wide text-gray-700 text-xs
				font-bold mb-2"
				for="extensions">
				Extensions
			</label>
			<div class="flex">
				<div class="w-1/3 h-12">
					<label class="flex justify-start items-start mr-24">
						<div
							class="bg-white border-2 rounded border-gray-400 w-6
							h-6 flex flex-shrink-0 justify-center items-center
							mr-2 focus-within:border-blue-500">
							<input
								type="checkbox"
								class="opacity-0 absolute"
								bind:checked="{extensions.tiled}" />
							<svg
								class="fill-current hidden w-4 h-4
								text-green-500 pointer-events-none"
								viewBox="0 0 20 20">
								<path d="M0 11l2-2 5 5L18 3l2 2L7 18z"></path>
							</svg>
						</div>
						<div class="select-none">Tiled</div>
					</label>
				</div>
				<div class="w-1/3 h-12">
					<label class="flex justify-start items-start mr-12">
						<div
							class="bg-white border-2 rounded border-gray-400 w-6
							h-6 flex flex-shrink-0 justify-center items-center
							mr-2 focus-within:border-blue-500">
							<input
								type="checkbox"
								class="opacity-0 absolute"
								bind:checked="{extensions.artemis}" />
							<svg
								class="fill-current hidden w-4 h-4
								text-green-500 pointer-events-none"
								viewBox="0 0 20 20">
								<path d="M0 11l2-2 5 5L18 3l2 2L7 18z"></path>
							</svg>
						</div>
						<div class="select-none">Artemis</div>
					</label>
				</div>
				<div class="w-1/3 h-12">
					<label class="flex justify-start items-start mr-12">
						<div
							class="bg-white border-2 rounded border-gray-400 w-6
							h-6 flex flex-shrink-0 justify-center items-center
							mr-2 focus-within:border-blue-500">
							<input
								type="checkbox"
								class="opacity-0 absolute"
								bind:checked="{extensions.ui}" />
							<svg
								class="fill-current hidden w-4 h-4
								text-green-500 pointer-events-none"
								viewBox="0 0 20 20">
								<path d="M0 11l2-2 5 5L18 3l2 2L7 18z"></path>
							</svg>
						</div>
						<div class="select-none">UI</div>
					</label>
				</div>
			</div>
			<div class="flex">
				<div class="w-1/3 h-12">
					<label class="flex justify-start items-start mr-10">
						<div
							class="bg-white border-2 rounded border-gray-400 w-6
							h-6 flex flex-shrink-0 justify-center items-center
							mr-2 focus-within:border-blue-500">
							<input
								type="checkbox"
								class="opacity-0 absolute"
								bind:checked="{extensions.messagebus}" />
							<svg
								class="fill-current hidden w-4 h-4
								text-green-500 pointer-events-none"
								viewBox="0 0 20 20">
								<path d="M0 11l2-2 5 5L18 3l2 2L7 18z"></path>
							</svg>
						</div>
						<div class="select-none whitespace-no-wrap">
							Message Bus
						</div>
					</label>
				</div>
				<div class="w-1/3 h-12">
					<label class="flex justify-start items-start mr-12">
						<div
							class="bg-white border-2 rounded border-gray-400 w-6
							h-6 flex flex-shrink-0 justify-center items-center
							mr-2 focus-within:border-blue-500">
							<input
								type="checkbox"
								class="opacity-0 absolute"
								bind:checked="{extensions.ai}" />
							<svg
								class="fill-current hidden w-4 h-4
								text-green-500 pointer-events-none"
								viewBox="0 0 20 20">
								<path d="M0 11l2-2 5 5L18 3l2 2L7 18z"></path>
							</svg>
						</div>
						<div class="select-none">AI</div>
					</label>
				</div>
				<div class="w-1/3 h-12">
					<label class="flex justify-start items-start mr-12">
						<div
							class="bg-white border-2 rounded border-gray-400 w-6
							h-6 flex flex-shrink-0 justify-center items-center
							mr-2 focus-within:border-blue-500">
							<input
								type="checkbox"
								class="opacity-0 absolute"
								bind:checked="{extensions.tools}" />
							<svg
								class="fill-current hidden w-4 h-4
								text-green-500 pointer-events-none"
								viewBox="0 0 20 20">
								<path d="M0 11l2-2 5 5L18 3l2 2L7 18z"></path>
							</svg>
						</div>
						<div class="select-none">Tools</div>
					</label>
				</div>
			</div>
			<div class="flex">
				<div class="w-1/4 h-12">
					<label class="flex justify-start items-start mr-12">
						<div
							class="bg-white border-2 rounded border-gray-400 w-6
							h-6 flex flex-shrink-0 justify-center items-center
							mr-2 focus-within:border-blue-500 mt-3">
							<input
								type="checkbox"
								class="opacity-0 absolute"
								bind:checked="{extensions.luascripting}" />
							<svg
								class="fill-current hidden w-4 h-4
								text-green-500 pointer-events-none"
								viewBox="0 0 20 20">
								<path d="M0 11l2-2 5 5L18 3l2 2L7 18z"></path>
							</svg>
						</div>
						<div class="select-none">Lua Scripting</div>
					</label>
				</div>
				<div class="w-1/4 h-12">
					<label class="flex justify-start items-start mr-12">
						<div
							class="bg-white border-2 rounded border-gray-400 w-6
							h-6 flex flex-shrink-0 justify-center items-center
							mr-2 focus-within:border-blue-500 mt-3">
							<input
								type="checkbox"
								class="opacity-0 absolute"
								bind:checked="{extensions.groovyscripting}" />
							<svg
								class="fill-current hidden w-4 h-4
								text-green-500 pointer-events-none"
								viewBox="0 0 20 20">
								<path d="M0 11l2-2 5 5L18 3l2 2L7 18z"></path>
							</svg>
						</div>
						<div class="select-none">Groovy Scripting</div>
					</label>
				</div>
				<div class="w-1/4 h-12">
					<label class="flex justify-start items-start mr-12">
						<div
							class="bg-white border-2 rounded border-gray-400 w-6
							h-6 flex flex-shrink-0 justify-center items-center
							mr-2 focus-within:border-blue-500 mt-3">
							<input
								type="checkbox"
								class="opacity-0 absolute"
								bind:checked="{extensions.pythonscripting}" />
							<svg
								class="fill-current hidden w-4 h-4
								text-green-500 pointer-events-none"
								viewBox="0 0 20 20">
								<path d="M0 11l2-2 5 5L18 3l2 2L7 18z"></path>
							</svg>
						</div>
						<div class="select-none">Python Scripting</div>
					</label>
				</div>
				<div class="w-1/4 h-12">
					<label class="flex justify-start items-start mr-12">
						<div
							class="bg-white border-2 rounded border-gray-400 w-6
							h-6 flex flex-shrink-0 justify-center items-center
							mr-2 focus-within:border-blue-500 mt-3">
							<input
								type="checkbox"
								class="opacity-0 absolute"
								bind:checked="{extensions.rubyscripting}" />
							<svg
								class="fill-current hidden w-4 h-4
								text-green-500 pointer-events-none"
								viewBox="0 0 20 20">
								<path d="M0 11l2-2 5 5L18 3l2 2L7 18z"></path>
							</svg>
						</div>
						<div class="select-none">Ruby Scripting</div>
					</label>
				</div>
			</div>
		</form>
	</div>
</div>
