import { activateSkills } from './filtering.js';

export const renderData = (data) => {
  const results = document.querySelector('.results-container')
  const layout = []

  data.map(item => {
    const languages = item.languages.map(langauge => `
      <li>
        <button class="skill">${langauge}</button>
      </li>
    `)
    const tools = item.tools.map(tool => `
      <li>
        <button class="skill">${tool}</button>
      </li>
    `)

    layout.push(`
      <div class="result">
        <div class="offer">
          <div class="logo-container">
            <img src="${item.logo}" alt="photosnap" class="logo">
          </div>
          <div class="result-data">
            <div class="place-container">
              <h3 class="place">${item.company}</h3>
              <span class="special ${item.new ? 'new' : ''}">New!</span>
              <span class="special ${item.featured ? 'feature' : ''}">Featured</span>
            </div>
            <h2 class="title">${item.position}</h2>
            <ul class="descriptions">
              <li class="description">${item.postedAt}</li>
              <li class="description">${item.contract}</li>
              <li class="description">${item.location}</li>
            </ul>
          </div>
        </div>
        <ul class="skills">
          <li>
            <button class="skill">${item.role}</button>
          </li>
          <li>
            <button class="skill">${item.level}</button>
          </li>
          ${languages ? languages.join('') : ''}
          ${tools ? tools.join('') : ''}
        </ul>
      </div>
    `)
  })

  results.innerHTML = layout.join('')
  activateSkills()
}