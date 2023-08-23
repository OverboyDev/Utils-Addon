self.C3.Plugins.Overboy_Utils.Exps = {
	wrap(x, min, max) {
		return C3.wrap(x, min, max)
	},

	angle360(angle) {
		return ((angle % 360) + 360) % 360
	},

	toRadians(degrees) {
		return C3.toRadians(degrees)
	},

	toDegrees(degrees) {
		return C3.toDegrees(degrees)
	},

	snap(x, step) {
		return Math.round(value / step) * step
	},

	remap(x, inMin, inMax, outMin, outMax) {
		return outMin + ((x - inMin) * (outMax - outMin)) / (inMax - inMin)
	},

	remapClamped(x, inMin, inMax, outMin, outMax) {
		return C3.clamp(C3.remap(x, inMin, inMax, outMin, outMax), outMin, outMax)
	},

	offsetXAtAngle(angle, distance) {
		return Math.cos(C3.toRadians(angle)) * distance
	},

	offsetYAtAngle(angle, distance) {
		return Math.sin(C3.toRadians(angle)) * distance
	},

	dt1() {
		return this._runtime._dt1
	},

	//angle

	//audio

	decibelToPercent(decibel) {
		return 100 * Math.pow(10, decibel / 33)
	},

	percentToDecibel(percent) {
		return 33 * Math.log10(percent / 100)
	},

	//better lerps

	lerpDt(a, b, x) {
		return C3.lerp(a, b, 1 - (x ^ dt))
	},

	anglelerpDt(a, b, x) {
		return C3.angleLerp(a, b, 1 - (x ^ dt))
	},

	//token loop

	tokenCurrent() {
		return this.tokenCurrent
	},

	tokenLoopindex() {
		return this.tokenLoopindex
	},

	//vanilla token

	tokenAt(text, index, sep) {
		if (typeof text !== "string" || typeof sep !== "string") return ""
		let arr = text.split(sep)
		const absIndex = Math.floor(Math.abs(index))
		const sign = Math.sign(index)
		if (absIndex === 0 || absIndex >= arr.length) return ""
		if (sign === 1) return arr[index]
		else return arr[arr.length + index]
	},

	tokenCount(text, sep) {
		if (typeof text !== "string" || typeof sep !== "string" || !text.length) return 0
		return text.split(sep).length
	},

	//custom token expressions

	tokenRandom(text, sep) {
		if (typeof text !== "string" || typeof sep !== "string") return ""

		let arr = text.split(sep)
		if (arr.length === 0) return "" // Handle empty array

		let index = Math.floor(Math.random() * arr.length)
		return arr[index]
	},

	tokenPush(text, token, sep) {
		if (typeof text !== "string" || typeof token !== "string" || typeof sep !== "string") return text
		if (text === "") return token
		return text + sep + token
	},

	tokenRemoveAll(text, token, sep) {
		if (typeof text !== "string" || typeof token !== "string" || typeof sep !== "string") return text

		let arr = text.split(sep)
		let filteredArr = arr.filter((item) => item !== token)

		return filteredArr.join(sep)
	},

	tokenFirst(text, sep) {
		if (typeof text !== "string" || typeof sep !== "string" || !text.length) return 0
		let arr = text.split(sep)
		return arr[0]
	},

	tokenLast(text, sep) {
		if (typeof text !== "string" || typeof sep !== "string" || !text.length) return 0
		let arr = text.split(sep)
		return arr[arr.length - 1]
	},

	//toDo
	/*
	tokenInsert(text, token, sep, index) {

		if (typeof text !== "string" || typeof index !== "number" || typeof token !== "string" || typeof sep !== "string") {
			return text
		}

		const arr = text.split(sep)
		arr.splice(index, 0, token)
		return arr.join(sep)
	},*/

	tokenSetAt(text, token, sep, index) {
		if (typeof text !== "string" || typeof index !== "number" || typeof token !== "string" || typeof sep !== "string") {
			return text
		}
		const arr = text.split(sep)
		let actualIndex = index < 0 ? arr.length + index : index

		if (actualIndex < 0 || actualIndex >= arr.length) {
			return text
		}

		arr[actualIndex] = token

		return arr.join(sep)
	},

	tokenInsertAt(text, token, sep, index) {
		if (typeof text !== "string" || typeof index !== "number" || typeof token !== "string" || typeof sep !== "string") {
			return text
		}

		const arr = text.split(sep)
		let actualIndex = index < 0 ? arr.length + index : index

		if (actualIndex < 0) {
			return text
		}
		if (actualIndex >= arr.length) {
			actualIndex = arr.length
		}

		arr.splice(actualIndex, 0, token)

		return arr.join(sep)
	},

	tokenRemoveAt(text, token, sep, index) {
		if (typeof text !== "string" || typeof index !== "number" || typeof token !== "string" || typeof sep !== "string") {
			return text
		}

		const arr = text.split(sep)
		let actualIndex = index < 0 ? arr.length + index : index

		if (actualIndex < 0) {
			return text
		}
		if (actualIndex >= arr.length) {
			actualIndex = arr.length
		}

		arr.splice(actualIndex, 1)
		return arr.join(sep)
	},

	tokenSortAsc(text, sep) {
		if (typeof text !== "string" || typeof sep !== "string") {
			return text
		}

		const arr = text.split(sep)
		const sortedArr = arr.slice().sort()
		return sortedArr.join(sep)
	},

	tokenSortDes(text, sep) {
		if (typeof text !== "string" || typeof sep !== "string") {
			return text
		}
		const arr = text.split(sep)
		const sortedArr = arr.slice().sort().reverse()
		return sortedArr.join(sep)
	},

	tokenReverse(text, sep) {
		if (typeof text !== "string" || typeof sep !== "string") {
			return text
		}
		const arr = text.split(sep)
		const reversedArr = arr.slice().reverse()
		return reversedArr.join(sep)
	},

	tokenShuffle(text, sep) {
		if (typeof text !== "string" || typeof sep !== "string") {
			return text
		}
		const arr = text.split(sep)
		for (let i = arr.length - 1; i > 0; i--) {
			const j = Math.floor(Math.random() * (i + 1))
			;[arr[i], arr[j]] = [arr[j], arr[i]] // Swap elements
		}
		return arr.join(sep)
	},

	tokenDeduplicateAll(text, sep) {
		if (typeof text !== "string" || typeof sep !== "string") {
			return text
		}

		const arr = text.split(sep)
		const uniqueArr = [...new Set(arr)] // Deduplicate using Set
		return uniqueArr.join(sep)
	},

	//======= RNG =======

	dice(sides) {
		if (sides < 1) return 0
		return Math.floor(Math.random() * sides) + 1
	},

	randomInt(a, b) {
		if (typeof b === "undefined") return Math.floor(this._runtime.Random() * a)
		else return Math.floor(this._runtime.Random() * (b - a) + a)
	},

	asPercent(a) {
		return a * 100
	},

	/*
	dice(faces) {
		return Math.floor(Math.random() * faces) + 1
	}*/

	//======= COLORS =======

	colorToValue(color) {
		return this.colorToRGBValue(color)
	},

	colorToHex(color) {
		return this.colorToHex(color)
	},

	lerpColor(color1, color2, x) {
		//
	},

	//string

	BBCodeColor(string, color) {
		const colorHex = this.colorToHex(color)
		if (colorHex === undefined) return string
		return "[color=" + colorHex + "]" + string + "[/color]"
	},

	BBCodeBold(string) {
		return "[b]" + string + "[/b]"
	},

	BBCodeItalic(string) {
		return "[i]" + string + "[/i]"
	},

	BBCodeUnderline(string, thickness) {
		if (typeof thickness === "number") {
			return "[u][lineThickness=" + thickness + "]" + string + "[/lineThickness][/u]"
		}
		return "[u]" + string + "[/u]"
	},

	BBCodeTag(string, tag) {
		return "[tag=" + tag + "]" + string + "[/tag]"
	}
}
