import { styled } from '@einfach-ui/styled/jsx'
import {
  card,
  cardHeader,
  cardTitle,
  cardDescription,
  cardContent,
  cardFooter,
} from '@einfach-ui/styled/recipes'

export const Root = styled('div', card)
export const Header = styled('div', cardHeader)
export const Title = styled('h3', cardTitle)
export const Description = styled('p', cardDescription)
export const Content = styled('div', cardContent)
export const Footer = styled('div', cardFooter)
