import allData from './data.js'
import { renderData } from './renderData.js'

export const activateSkills = () => {
  const $skills =  document.querySelectorAll('.skill')

  $skills.forEach($skill => {
    $skill.addEventListener('click', e => {
      const skill = e.target.outerText
      const $header = document.querySelector('.header-container')
      const $tagsContainer = document.querySelector('.tags')

      if(!$tagsContainer){
        $header.innerHTML = `
          <ul class="tags">
            <li class="tag">${skill}</li>
          </ul>
        `
        filterData()
        activateDeleteTags()
        return
      }

      const $tags = [...document.querySelectorAll('.tag')]

      const isAlreadyThere = $tags.find($tag => {
        return $tag.textContent === skill
      })

      if(isAlreadyThere){
        e.target.classList.add('btn-error')
        setTimeout(() => {
          e.target.classList.remove('btn-error')
        }, 2000);
        return
      }

      const actualContent = $tagsContainer.innerHTML
      $tagsContainer.innerHTML = `
        ${actualContent}
        <li class="tag">${skill}</li>
      `

      filterData()
      activateDeleteTags()
    })
  })
}

const activateDeleteTags = () => {
  const $tags = [...document.querySelectorAll('.tag')]

  $tags.forEach($tag => {
    $tag.addEventListener('click', (e) => {
      const $header = document.querySelector('.header-container')
      const $tagsContainer = document.querySelector('.tags')

      $tagsContainer.removeChild(e.target)

      if($tagsContainer.childElementCount === 0 ) {
        $header.innerHTML = ''
      }

      filterData()
    })
  })
}

const filterData = () => {
  const $tags = [...document.querySelectorAll('.tag')]
  const tagsToFilter = $tags.map($tag => $tag.textContent)

  const dataFiltered = allData.filter(item => {
    const itemTags = [...item.tools, ...item.languages, item.role, item.level]

    const itMatches = []

    itemTags.map(tag => {
      if(tagsToFilter.includes(tag)) itMatches.push(tag)
    })

    if (itMatches.length === tagsToFilter.length) {
      return item
    }
  })

  renderData(dataFiltered)
}

