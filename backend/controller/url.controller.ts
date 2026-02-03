import { Request, Response } from "express";
import { asyncHandler } from '../../packages/middleware/asyncHandler';
import urlService from '../service/url.service';

export const redirectToOriginalUrl = asyncHandler(async (req: Request, res: Response) => {
    const { shortCode } = req.params;
    const url = await urlService.getOriginalUrl(shortCode as string);
    return res.redirect(url);
});

export const getUrlStats = asyncHandler(async (req: Request, res: Response) => {
    const { shortCode } = req.params;
    const stats = await urlService.getUrlStats(shortCode as string);
    return res.status(200).json({
        success: true,
        message: "URL statistics retrieved successfully",
        data: stats
    });
});

export const shortenUrl = asyncHandler(async (req: Request, res: Response) => {
    const { originalUrl } = req.body;
    const url = await urlService.shortenUrl({ originalUrl });
    return res.status(201).json({
        success: true,
        message: "URL shortened successfully",
        data: url
    });
});

export const updateUrl = asyncHandler(async (req: Request, res: Response) => {
    const { shortCode } = req.params;
    const { originalUrl } = req.body;
    const updatedUrl = await urlService.updateUrl(shortCode as string, { originalUrl });
    return res.status(200).json({
        success: true,
        message: "URL updated successfully",
        data: updatedUrl
    });
});

export const deleteUrl = asyncHandler(async (req: Request, res: Response) => {
    const { shortCode } = req.params;
    await urlService.deleteUrl(shortCode as string);
    return res.status(200).json({
        success: true,
        message: "URL deleted successfully"
    });
});
