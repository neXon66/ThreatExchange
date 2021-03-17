/**
 * Copyright (c) Facebook, Inc. and its affiliates. All Rights Reserved
 */

// TODO figure out root path. For now copy your own URL gateway here
const API_ROOT = 'https://<APPID>.execute-api.us-east-1.amazonaws.com'
// TODO replace with real auth someday
const API_TOKEN_KEY = 'access_token';
const API_TOKEN = 'asupersecrettoken';

export async function fetchMatches() {
  return getAPI("matches")
    .then((data) => {
      return (data["matches"])
    })
}

export async function uploadImage(fileObject) {
  const formData = new FormData();
  formData.append("image", fileObject);
  return postAPI('upload', formData);
}

async function getAPI(
  route,
  params = {},
) {
  const urlWithParams = new URL(`${API_ROOT}/${route}`);
  urlWithParams.searchParams.append(API_TOKEN_KEY, API_TOKEN);
  for (const [key, value] of Object.entries(params)) {
    urlWithParams.searchParams.append(key, value);
  }

  const response = await fetch(urlWithParams.toString(), {
    method: 'GET',
  });
  return response.json();
}

async function postAPI(
  route,
  body,
  params = {},
) {
  const urlWithParams = new URL(`${API_ROOT}/${route}`);
  urlWithParams.searchParams.append(API_TOKEN_KEY, API_TOKEN);

  for (const [key, value] of Object.entries(params)) {
    urlWithParams.searchParams.append(key, value);
  }

  const requestOptions = {
    method: 'POST',
    body: body
  }

  return await fetch(urlWithParams.toString(), requestOptions);
}