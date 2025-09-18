/******************************************************************************
 * Copyright (C) 2024 The Trustees of Indiana University
 * SPDX-License-Identifier: BSD-3-Clause
 *****************************************************************************/

const remToPixel = (rem) => {
	return parseInt(rem) * 16;
};

export default remToPixel;
