import React from "react"
import {Switch, Route, Redirect} from 'react-router-dom'
import { AuthPage } from "./authPage"
import { CreatePage } from "./createPage"
import { DetailPage } from "./detailPage"
import { LinksPage } from "./linksPage"

export const useRoutes = isAuthenticated => {
    if (isAuthenticated) {
        return (
            <Switch>
                <Route path="/links" exact>
                    <LinksPage />
                </Route>
                <Route path="/create" exact>
                    <CreatePage />
                </Route>
                <Route path="/detail/:id">
                    <DetailPage />
                </Route>
                <Redirect to="/create"/>
            </Switch>
        )
    }

    return(
        <Switch>
            <Route path="/" exact>
                <AuthPage />
            </Route>
            <Redirect to="/"/>
        </Switch>
    )
}