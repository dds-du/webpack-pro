export default (text='hello world')=>{
	const elem = document.createElement('div')
	elem.innerHTML = text

	return elem
}