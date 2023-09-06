const C3 = self.C3

C3.Plugins.Overboy_Utils.Instance = class Overboy_UtilsInstance extends C3.SDKInstanceBase {
	constructor(inst, properties) {
		super(inst)

		// Initialise object properties
		this._testProperty = 0

		if (properties) {
			// note properties may be null in some cases
			this._testProperty = properties[0]
		}

		this.colorTemplates = {}

		this.colorDefaults = {
			aliceblue: "#f0f8ff",
			antiquewhite: "#faebd7",
			aqua: "#00ffff",
			aquamarine: "#7fffd4",
			azure: "#f0ffff",
			beige: "#f5f5dc",
			bisque: "#ffe4c4",
			black: "#000000",
			blanchedalmond: "#ffebcd",
			blue: "#0000ff",
			blueviolet: "#8a2be2",
			brown: "#a52a2a",
			burlywood: "#deb887",
			cadetblue: "#5f9ea0",
			chartreuse: "#7fff00",
			chocolate: "#d2691e",
			coral: "#ff7f50",
			cornflowerblue: "#6495ed",
			cornsilk: "#fff8dc",
			crimson: "#dc143c",
			cyan: "#00ffff",
			darkblue: "#00008b",
			darkcyan: "#008b8b",
			darkgoldenrod: "#b8860b",
			darkgray: "#a9a9a9",
			darkgreen: "#006400",
			darkkhaki: "#bdb76b",
			darkmagenta: "#8b008b",
			darkolivegreen: "#556b2f",
			darkorange: "#ff8c00",
			darkorchid: "#9932cc",
			darkred: "#8b0000",
			darksalmon: "#e9967a",
			darkseagreen: "#8fbc8f",
			darkslateblue: "#483d8b",
			darkslategray: "#2f4f4f",
			darkturquoise: "#00ced1",
			darkviolet: "#9400d3",
			deeppink: "#ff1493",
			deepskyblue: "#00bfff",
			dimgray: "#696969",
			dodgerblue: "#1e90ff",
			firebrick: "#b22222",
			floralwhite: "#fffaf0",
			forestgreen: "#228b22",
			fuchsia: "#ff00ff",
			gainsboro: "#dcdcdc",
			ghostwhite: "#f8f8ff",
			gold: "#ffd700",
			goldenrod: "#daa520",
			gray: "#808080",
			green: "#008000",
			greenyellow: "#adff2f",
			honeydew: "#f0fff0",
			hotpink: "#ff69b4",
			"indianred ": "#cd5c5c",
			indigo: "#4b0082",
			ivory: "#fffff0",
			khaki: "#f0e68c",
			lavender: "#e6e6fa",
			lavenderblush: "#fff0f5",
			lawngreen: "#7cfc00",
			lemonchiffon: "#fffacd",
			lightblue: "#add8e6",
			lightcoral: "#f08080",
			lightcyan: "#e0ffff",
			lightgoldenrodyellow: "#fafad2",
			lightgrey: "#d3d3d3",
			lightgreen: "#90ee90",
			lightpink: "#ffb6c1",
			lightsalmon: "#ffa07a",
			lightseagreen: "#20b2aa",
			lightskyblue: "#87cefa",
			lightslategray: "#778899",
			lightsteelblue: "#b0c4de",
			lightyellow: "#ffffe0",
			lime: "#00ff00",
			limegreen: "#32cd32",
			linen: "#faf0e6",
			magenta: "#ff00ff",
			maroon: "#800000",
			mediumaquamarine: "#66cdaa",
			mediumblue: "#0000cd",
			mediumorchid: "#ba55d3",
			mediumpurple: "#9370d8",
			mediumseagreen: "#3cb371",
			mediumslateblue: "#7b68ee",
			mediumspringgreen: "#00fa9a",
			mediumturquoise: "#48d1cc",
			mediumvioletred: "#c71585",
			midnightblue: "#191970",
			mintcream: "#f5fffa",
			mistyrose: "#ffe4e1",
			moccasin: "#ffe4b5",
			navajowhite: "#ffdead",
			navy: "#000080",
			oldlace: "#fdf5e6",
			olive: "#808000",
			olivedrab: "#6b8e23",
			orange: "#ffa500",
			orangered: "#ff4500",
			orchid: "#da70d6",
			palegoldenrod: "#eee8aa",
			palegreen: "#98fb98",
			paleturquoise: "#afeeee",
			palevioletred: "#d87093",
			papayawhip: "#ffefd5",
			peachpuff: "#ffdab9",
			peru: "#cd853f",
			pink: "#ffc0cb",
			plum: "#dda0dd",
			powderblue: "#b0e0e6",
			purple: "#800080",
			rebeccapurple: "#663399",
			red: "#ff0000",
			rosybrown: "#bc8f8f",
			royalblue: "#4169e1",
			saddlebrown: "#8b4513",
			salmon: "#fa8072",
			sandybrown: "#f4a460",
			seagreen: "#2e8b57",
			seashell: "#fff5ee",
			sienna: "#a0522d",
			silver: "#c0c0c0",
			skyblue: "#87ceeb",
			slateblue: "#6a5acd",
			slategray: "#708090",
			snow: "#fffafa",
			springgreen: "#00ff7f",
			steelblue: "#4682b4",
			tan: "#d2b48c",
			teal: "#008080",
			thistle: "#d8bfd8",
			tomato: "#ff6347",
			turquoise: "#40e0d0",
			violet: "#ee82ee",
			wheat: "#f5deb3",
			white: "#ffffff",
			whitesmoke: "#f5f5f5",
			yellow: "#ffff00",
			yellowgreen: "#9acd32"
		}

		this.tokenCurrent = ""
		this.tokenLoopindex = 0
	}

	Release() {
		super.Release()
	}

	_SetTestProperty(n) {
		this._testProperty = n
	}

	_GetTestProperty() {
		return this._testProperty
	}

	SaveToJson() {
		return {
			// data to be saved for savegames
		}
	}

	LoadFromJson(o) {
		// load state for savegames
	}

	//==============================================================================
	// ON LAYER

	_IsOnLayer_Parent(objectClass, layer, which, excludeSelf) {
		if (!layer) return false

		const mySol = objectClass.GetCurrentSol()
		const myInstances = mySol.GetInstances()
		if (myInstances.length === 0) return false
		const pickedInstances = new Set()

		for (let i = 0, len = myInstances.length; i < len; ++i) {
			const myInst = myInstances[i]
			const instLayer = myInst.GetWorldInfo().GetLayer()
			if (instLayer === layer) {
				if (excludeSelf === 0) {
					pickedInstances.add(myInst)
				}
			}
			//any parent layer
			else if (which === 0) {
				////console.log("Parent Layers", [...instLayer.parentLayers()])
				if ([...layer.parentLayers()].includes(instLayer)) {
					pickedInstances.add(myInst)
				}
			}
			//only direct parent layer
			else if (which === 1) {
				if (layer.GetParentLayer() === instLayer) {
					pickedInstances.add(myInst)
				}
			}
		}
		if (pickedInstances.size === 0) return false
		mySol.SetSetPicked(pickedInstances)
		objectClass.ApplySolToContainer()
		return true
	}

	_IsOnLayer_Sublayer(objectClass, layer, which, excludeSelf) {
		if (!layer) return false

		const mySol = objectClass.GetCurrentSol()
		const myInstances = mySol.GetInstances()
		if (myInstances.length === 0) return false
		const pickedInstances = new Set()

		for (let i = 0, len = myInstances.length; i < len; ++i) {
			const myInst = myInstances[i]
			const instLayer = myInst.GetWorldInfo().GetLayer()
			if (instLayer === layer) {
				if (excludeSelf === 0) {
					pickedInstances.add(myInst)
				}
			}
			//any sublayer
			else if (which === 0) {
				//cant be self because that was already checked : nice
				if ([...instLayer.parentLayers()].includes(layer)) {
					pickedInstances.add(myInst)
				}
			}
			//only direct sublayers
			else if (which === 1) {
				if (instLayer.GetParentLayer() === layer) {
					pickedInstances.add(myInst)
				}
			}
		}
		if (pickedInstances.size === 0) return false
		mySol.SetSetPicked(pickedInstances)
		objectClass.ApplySolToContainer()
		return true
	}

	//==============================================================================
	// PICK HIERARCHY

	_PickParent_Best(currentObjectClass, parentObjectClass, level, which) {
		//common
		const mySol = currentObjectClass.GetCurrentSol()
		const myInstances = mySol.GetInstances()
		if (myInstances.length === 0) return false
		const parentSol = parentObjectClass.GetCurrentSol()
		let parentInstances = parentSol.GetInstances()
		if (parentSol.IsSelectAll()) {
			const parentInstsPendingCreate = [...this._runtime.instancesPendingCreateForObjectClass(parentObjectClass)]
			if (parentInstsPendingCreate.length > 0) parentInstances = parentInstances.concat(parentInstsPendingCreate)
		}
		if (parentInstances.length === 0) return false
		const parentInstancesSet = new Set(parentInstances)
		const pickParents = new Set()

		//which : 0=closest, 1=furthest, 2=from here, 3=from top

		//const onlyContainingLevel

		for (let i = 0, len = myInstances.length; i < len; ++i) {
			const myInst = myInstances[i]
			//
			let arrayParents = [...myInst.parents()]
			//only level containing parentObjectClass
			if (which === 0 || which === 1) {
				arrayParents = arrayParents.filter((p) => p.BelongsToObjectClass(parentObjectClass))
			}
			const parentLevels = arrayParents.length

			//const parentsUIDs = arrayParents.map((p) => p.GetUID())

			//const currentHierarchyLevel = arrayParents.length
			//console.log("parents", arrayParents)
			//console.log("parentLevels", parentLevels)
			////console.log("parents UID", parentsUIDs)
			////console.log("currentHierarchyLevel", currentHierarchyLevel)

			const rightIndex = which === 0 || which === 2 ? level - 1 : parentLevels - level

			if (rightIndex >= parentLevels) continue

			const rightParent = arrayParents[rightIndex]
			if (rightParent.BelongsToObjectClass(parentObjectClass) && parentInstancesSet.has(rightParent)) {
				pickParents.add(rightParent)
			}

			/*
			for (const [index, parentInst] of arrayParents.entries()) {
				//only level containing parentObjectClass

				//const parentHierarchyLevel = [...parentInst.parents()].length
				////console.log("parentHierarchyLevel", parentHierarchyLevel)
				////console.log("diff", currentHierarchyLevel - parentHierarchyLevel)

				let rightLevel = false
				//if closest or from here
				if (which === 0 || which === 2) {
					if (index === level - 1) {
						rightLevel = true
					}
					//if furthest or from top
				} else {
					if (index === parentLevels - level) {
						rightLevel = true
					}
				}

				if (rightLevel && parentInst.BelongsToObjectClass(parentObjectClass) && parentInstancesSet.has(parentInst)) {
					//console.log("Pick this parent")
					pickParents.add(parentInst)
					break
				}
			}*/
		}
		if (pickParents.size === 0) return false
		parentSol.SetSetPicked(pickParents)
		parentObjectClass.ApplySolToContainer()
		return true
	}

	_PickChildren_Best(currentObjectClass, childObjectClass, level, which) {
		const mySol = currentObjectClass.GetCurrentSol()
		const myInstances = mySol.GetInstances()
		if (myInstances.length === 0) return false
		const childSol = childObjectClass.GetCurrentSol()
		let childInstances = childSol.GetInstances()
		if (childSol.IsSelectAll()) {
			const childInstsPendingCreate = [...this._runtime.instancesPendingCreateForObjectClass(childObjectClass)]
			if (childInstsPendingCreate.length > 0) childInstances = childInstances.concat(childInstsPendingCreate)
		}
		if (childInstances.length === 0) return false
		const childInstancesSet = new Set(childInstances)
		const pickChildren = new Set()

		//which: 0=closest, 1=furthest, 2=from here, 3=from bottom

		for (let i = 0, len = myInstances.length; i < len; ++i) {
			const myInst = myInstances[i]
			//console.log("myInst", i, myInst)

			const parentsAbove = [...myInst.parents()]
			//const currentHierarchyLevel = parentsAbove.length

			//if closest or from here
			if (which === 0 || which === 2) {
				for (const childInst of myInst.allChildren()) {
					if (childInst.BelongsToObjectClass(childObjectClass) && childInstancesSet.has(childInst)) {
						let childParents = [...childInst.parents()]
						//just keep parents under currrent Object1 instance
						childParents = childParents.filter((p) => !parentsAbove.includes(p))
						childParents.pop() //remove Object1 instance (last parent

						//only level containing childObjectClass
						if (which === 0) {
							childParents = childParents.filter((p) => p.BelongsToObjectClass(childObjectClass))
						}
						const childUnderLevel = childParents.length
						if (childUnderLevel === level - 1) {
							pickChildren.add(childInst)
						}
					}
				}
			}
		}
		if (pickChildren.size === 0) return false
		childSol.SetSetPicked(pickChildren)
		childObjectClass.ApplySolToContainer()
		return true
	}

	PickChildren(childObjectClass, which) {
		const mySol = this.GetCurrentSol()
		const myInstances = mySol.GetInstances()
		if (myInstances.length === 0) return false
		const childSol = childObjectClass.GetCurrentSol()
		let childInstances = childSol.GetInstances()
		if (childSol.IsSelectAll()) {
			const childInstsPendingCreate = [...this._runtime.instancesPendingCreateForObjectClass(childObjectClass)]
			if (childInstsPendingCreate.length > 0) childInstances = childInstances.concat(childInstsPendingCreate)
		}
		if (childInstances.length === 0) return false
		const childInstancesSet = new Set(childInstances)
		const pickChildren = new Set()

		//which: 0=own, 1=all, 2=bottom

		for (let i = 0, len = myInstances.length; i < len; ++i) {
			const myInst = myInstances[i]
			if (which === 2 && !myInst.HasChildren() && myInst.BelongsToObjectClass(childObjectClass) && childInstancesSet.has(myInst))
				pickChildren.add(myInst)
			for (const childInst of which === 0 ? myInst.children() : myInst.allChildren()) {
				if (which === 2 && childInst.HasChildren()) continue
				if (childInst.BelongsToObjectClass(childObjectClass) && childInstancesSet.has(childInst)) pickChildren.add(childInst)
			}
		}
		if (pickChildren.size === 0) return false
		childSol.SetSetPicked(pickChildren)
		childObjectClass.ApplySolToContainer()
		return true
	}
	PickParent(parentObjectClass, which) {
		const mySol = this.GetCurrentSol()
		const myInstances = mySol.GetInstances()
		if (myInstances.length === 0) return false
		const parentSol = parentObjectClass.GetCurrentSol()
		let parentInstances = parentSol.GetInstances()
		if (parentSol.IsSelectAll()) {
			const parentInstsPendingCreate = [...this._runtime.instancesPendingCreateForObjectClass(parentObjectClass)]
			if (parentInstsPendingCreate.length > 0) parentInstances = parentInstances.concat(parentInstsPendingCreate)
		}
		if (parentInstances.length === 0) return false
		const parentInstancesSet = new Set(parentInstances)
		const pickParents = new Set()
		for (let i = 0, len = myInstances.length; i < len; ++i) {
			const myInst = myInstances[i]
			//all parents
			if (which === 1)
				for (const parentInst of myInst.parents()) {
					if (parentInst.BelongsToObjectClass(parentObjectClass) && parentInstancesSet.has(parentInst)) pickParents.add(parentInst)
				}
			else {
				let parentInst
				//own parent
				if (which === 0) {
					parentInst = myInst.GetParent()
					if (parentInst === null) continue
				}
				//top parent
				else parentInst = myInst.GetTopParent()
				if (parentInst.BelongsToObjectClass(parentObjectClass) && parentInstancesSet.has(parentInst)) pickParents.add(parentInst)
			}
		}
		if (pickParents.size === 0) return false
		parentSol.SetSetPicked(pickParents)
		parentObjectClass.ApplySolToContainer()
		return true
	}
	/*
	  PickNthChild(childObjectClass, index) {
		const mySol = this.GetCurrentSol();
		const myInstances = mySol.GetInstances();
		if (myInstances.length === 0) return false;
		const childSol = childObjectClass.GetCurrentSol();
		let childInstances = childSol.GetInstances();
		if (childSol.IsSelectAll()) {
		  const childInstsPendingCreate = [
			...this._runtime.instancesPendingCreateForObjectClass(childObjectClass),
		  ];
		  if (childInstsPendingCreate.length > 0)
			childInstances = childInstances.concat(childInstsPendingCreate);
		}
		if (childInstances.length === 0) return false;
		const childInstancesSet = new Set(childInstances);
		const pickChildren = [];
		for (let i = 0, len = myInstances.length; i < len; ++i) {
		  const myInst = myInstances[i];
		  const childInst = myInst.GetChildAt(index);
		  if (
			childInst !== null &&
			childInst.BelongsToObjectClass(childObjectClass) &&
			childInstancesSet.has(childInst)
		  )
			pickChildren.push(childInst);
		}
		if (pickChildren.length === 0) return false;
		childSol.SetArrayPicked(pickChildren);
		childObjectClass.ApplySolToContainer();
		return true;
	  }
	  CompareChildCount(which, cmp, count) {
		switch (which) {
		  case 0:
		  default: {
			return C3.compare(this._inst.GetChildCount(), cmp, count);
		  }
		  case 1: {
			return C3.compare(this._inst.GetAllChildCount(), cmp, count);
		  }
		}
	  }*/

	//==================== COLOR ====================

	colorToRGBValue(color) {
		//C3colorvalue
		if (typeof color === "number") {
			//console.log("colorToRPBValue is number")
			return color
		}
		//hex
		if ((typeof color === "string") & color.startsWith("#")) {
			//console.log("colorToRPBValue is hex")
			return this.hex2number(color)
		}
		//colorname
		//if ((typeof color === "string") & isNaN(parseInt(color.charAt(0)))) {
		if (typeof color === "string") {
			//console.log("colorToRPBValue is template")
			color = this.colorNameToHex(color)
			//console.log("colorNameToHex =", color)
			return this.hex2number(color)
		}
		return undefined
	}

	colorToHex(color) {
		//C3colorvalue
		if (typeof color === "number") {
			return this.number2hex(color)
		}
		//hex
		if (typeof color === "string" && color.startsWith("#")) {
			return color
		}
		//colorname
		if (typeof color === "string" && isNaN(parseInt(color.charAt(0)))) {
			return this.colorNameToHex(color)
		}
		//C3colorvalue
		return undefined
	}

	clamp(num, min, max) {
		return num <= min ? min : num >= max ? max : num
	}

	float2rgb(r, g, b) {
		return [Math.floor(r * 255.99), Math.floor(g * 255.99), Math.floor(b * 255.99)]
	}

	//old doesn't work
	rgb2hex(arr) {
		const arr256 = arr.map((v) => Math.floor(v * 255.99))
		return "#" + ((1 << 24) + (arr256[0] << 16) + (arr256[1] << 8) + arr256[2]).toString(16).slice(1)
	}

	hex2float(hex) {
		const res = hex.match(/[a-f0-9]{2}/gi)
		return res && res.length === 3 ? res.map((v) => parseInt(v, 16) / 255) : null
	}

	hex2number(hex) {
		if (typeof hex === "string" && hex.startsWith("#")) {
			const components = hex.match(/[a-fA-F0-9]{2}/g) // Match pairs of hexadecimal characters
			if (components && components.length === 3) {
				const red = parseInt(components[0], 16)
				const green = parseInt(components[1], 16)
				const blue = parseInt(components[2], 16)

				const packedColor = red | (green << 8) | (blue << 16)
				return packedColor
			}
		} else {
			console.log("hex2number : not a hex string", hex)
			return 0
		}
	}

	float2string(a, b, c, d) {
		a = this.clamp(Math.floor(1024 * a), -8192, 8191)
		b = this.clamp(Math.floor(1024 * b), -8192, 8191)
		c = this.clamp(Math.floor(1024 * c), -8192, 8191)
		d = this.clamp(Math.floor(1023 * d), 0, 1023)
		if (a < 0) a += 16384
		if (b < 0) b += 16384
		if (c < 0) c += 16384
		return -(16384 * (16384 * a) * 1024 + 16384 * b * 1024 + c * 1024 + d)
	}

	number2r(g) {
		if (g >= 0) return (g & 255) / 255
		g = Math.floor(-g / 274877906944)
		if (g > 8191) g -= 16384
		return g / 1024
	}

	number2g(g) {
		if (g >= 0) return ((g & 65280) >> 8) / 255
		g = Math.floor((-g % 274877906944) / 16777216)
		if (g > 8191) g -= 16384
		return g / 1024
	}

	number2b(g) {
		if (g >= 0) return ((g & 16711680) >> 16) / 255
		g = Math.floor((-g % 16777216) / 1024)
		if (g > 8191) g -= 16384
		return g / 1024
	}

	number2rgb(number) {
		return [this.number2r(number), this.number2g(number), this.number2b(number)]
	}

	number2hex(number) {
		const rgb = this.number2rgb(number)
		//console.log("number2rgb", number, rgb)
		return this.rgb2hex(rgb)
	}

	colorNameToValue(color) {
		return this.hex2number(this.colorNameToHex(color))
	}

	colorNameToHex(color) {
		if (this.colorTemplates.hasOwnProperty(color.toLowerCase())) {
			//console.log("there is a template for this color", color.toLowerCase())
			//color = this.colorTemplates[color.toLowerCase()]
			//console.log("colorTemplates =", color)
			//return this.colorToHex(color)
			return this.colorTemplates[color.toLowerCase()]
		}
		if (this.colorDefaults.hasOwnProperty(color.toLowerCase())) {
			//color = this.colorDefaults[color.toLowerCase()]
			//return this.colorToHex(color)
			return this.colorDefaults[color.toLowerCase()]
		}
		console.log("no template for this color", color.toLowerCase())
		return undefined
	}

	GetScriptInterfaceClass() {
		return self.IOverboy_UtilsInstance
	}
}

// Script interface. Use a WeakMap to safely hide the internal implementation details from the
// caller using the script interface.
const map = new WeakMap()

self.IOverboy_UtilsInstance = class IOverboy_UtilsInstance extends self.IInstance {
	constructor() {
		super()

		// Map by SDK instance
		map.set(this, self.IInstance._GetInitInst().GetSdkInstance())
	}

	// Example setter/getter property on script interface
	set testProperty(n) {
		map.get(this)._SetTestProperty(n)
	}

	get testProperty() {
		return map.get(this)._GetTestProperty()
	}
}
