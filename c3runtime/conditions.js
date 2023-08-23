self.C3.Plugins.Overboy_Utils.Cnds = {
	TransferPicking(object1, object2, transferType) {
		const obj1Sol = object1.GetCurrentSol()
		let obj1Instances = obj1Sol.GetInstances()
		if (obj1Instances.length === 0) return false

		const obj2Sol = object2.GetCurrentSol()

		let obj2Instances = []
		if (transferType === 0) {
			obj2Instances = object2.GetInstances()
		} else if (transferType === 1) {
			obj2Instances = obj2Sol.GetInstances()
		}

		if (obj2Instances.length === 0) return false

		//obj1Instances = obj1Instances.map((inst) => inst.GetUID())
		//obj2Instances = obj2Instances.map((inst) => inst.GetUID())

		//console.log("obj1Instances", obj1Instances)
		//console.log("obj2Instances", obj2Instances)
		const pickedInstancesArray = obj1Instances.filter((inst) => obj2Instances.includes(inst))
		//console.log("pickedInstancesArray", pickedInstancesArray)
		const pickedInstances = new Set(pickedInstancesArray)

		if (pickedInstances.size === 0) return false
		obj2Sol.SetSetPicked(pickedInstances)
		object2.ApplySolToContainer()
		return true
	},

	IsOnLayer_Parent(objectClass, layer, which, excludeSelf) {
		return this._IsOnLayer_Parent(objectClass, layer, which, excludeSelf)
	},

	IsOnLayer_Sublayer(objectClass, layer, which, excludeSelf) {
		return this._IsOnLayer_Sublayer(objectClass, layer, which, excludeSelf)
	},

	Obj_OnLayer_VisibleInteractible(objectClass) {
		const objSol = objectClass.GetCurrentSol()
		const objInstances = objSol.GetInstances()
		if (objInstances.length === 0) return false
		const pickedInstances = new Set()

		/*
		//console.log("On Layer Visisble Interactible Check : Instances length=", objInstances.length)
		//console.log("ObjInstances", objInstances)
		//console.log("ObjInstances Type", objInstances[0]._objectType._name)
		//console.log("ObjInstances Layer", objInstances[0].GetInterfaceClass().layer)*/

		for (let i = 0, len = objInstances.length; i < len; ++i) {
			const inst = objInstances[i]
			const layer = inst.GetInterfaceClass().layer
			////console.log("layer", layer)
			////console.log("layerIsVisible", layer.isSelfAndParentsVisible)
			////console.log("layerIsVisible", layer.isSelfAndParentsVisible)
			//scripting interface
			//if (layer.isSelfAndParentsVisible && layer.isSelfAndParentsInteractive) {
			if (layer.isSelfAndParentsVisible && layer.isSelfAndParentsInteractive) {
				pickedInstances.add(inst)
			}
		}

		if (pickedInstances.size === 0) return false
		objSol.SetSetPicked(pickedInstances)
		objectClass.ApplySolToContainer()
		return true
	},

	PickParent(currentObjectClass, parentObjectClass, level, which) {
		//return true
		return this._PickParent_Best(currentObjectClass, parentObjectClass, level, which)
	},

	PickChildren(currentObjectClass, childObjectClass, level, which) {
		return this._PickChildren_Best(currentObjectClass, childObjectClass, level, which)
	},

	/*
	Obj_OnLayer_IsVisibleAndInteractible(objectClass) {
		const mySol = objectClass.GetCurrentSol()
		const myInstances = mySol.GetInstances()
		if (myInstances.length === 0) return false
		const pickedInstances = new Set()

		for (let i = 1, len = myInstances.length; i < len; ++i) {
			const inst = myInstances[i]

			const layer = inst.GetInterfaceClass().layer
			if (layer.isSelfAndParentsVisible && layer.isSelfAndParentsInteractive) {
				pickedInstances.add(inst)
			}
		}
		if (pickedInstances.size === 0) return false
		mySol.SetSetPicked(pickedInstances)
		objectClass.ApplySolToContainer()
		return true
	},*/

	//===== TOKENS =====

	ForEachToken(text, sep) {
		//for each with sortedKeys array argument

		if (text === "") return false
		const arr = text.split(sep)

		const runtime = this._runtime
		const eventSheetManager = runtime.GetEventSheetManager()
		const currentEvent = runtime.GetCurrentEvent()
		const solModifiers = currentEvent.GetSolModifiers()
		const eventStack = runtime.GetEventStack()
		const oldFrame = eventStack.GetCurrentStackFrame()
		const newFrame = eventStack.Push(currentEvent)

		const oldToken = this.tokenCurrent
		const oldLoopindex = this.tokenLoopindex

		//console.log("Old loopindex", oldLoopindex)
		this.tokenLoopindex = -1

		runtime.SetDebuggingEnabled(false)

		for (const token of arr) {
			/*
			if (this._stopLoop) {
				//console.log("stop loop")
				this._stopLoop = false
				break
			}*/

			this.tokenCurrent = token
			this.tokenLoopindex++

			//console.log("loopindex", this._curLoopindex)
			eventSheetManager.PushCopySol(solModifiers)
			currentEvent.Retrigger(oldFrame, newFrame)
			eventSheetManager.PopSol(solModifiers)
		}
		//this._stopLoop = false
		runtime.SetDebuggingEnabled(true)

		this.tokenCurrent = oldToken
		this.tokenLoopindex = oldLoopindex

		eventStack.Pop()
		return false
	},

	HasToken(text, sep, token) {
		/*
		if (typeof text !== "string" || typeof sep !== "string" || typeof token !== "string") {
			return false
		}*/

		const arr = text.split(sep)
		return arr.includes(token)
	},

	//===== RNG =====

	Chance(chance, outof) {
		const roll = this._runtime.Random() * outof
		return roll < chance
	},

	ChancePercent(chance) {
		const roll = this._runtime.Random() * 100
		return roll < chance
	}
}
